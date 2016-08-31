<?php namespace App\Http\Controllers;

use App\Questionaire;
use App\QuestionaireResult;
use App\Criterion;
use App\Question;
use App\Choice;
use App\Participant;
use App\ParticipantAnswer;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use Cache;
use Request;
use Auth;

class FormController extends Controller {

	public function load($id = null) {
		if ($id) {
			$questionaire = Questionaire::with('criteria', 'questions.meta')
										->where('id', $id)	
										->first();

			if (!$questionaire) {
				return response()->json(null, 404);
			}

			if ($questionaire->level > 0) {
				if (\Auth::check()) {
				} else {
					return response()->json('auth/login', 302);
				}
			}

			foreach ($questionaire->questions as $q) {
				$q->choices = Choice::with('subchoices', 'inputs')
									->where('questionID', $q->id)
									->whereNull('parentID')
									->get();
			}

			return response()->json($questionaire);
		} else {
			return $this->all();
		}
	}

	public function show($id = null) {
		return view('questionaire/do');
	}

	public function template($type, $subType) {
		return view('questionaire/'.$type.'-'.$subType);
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @return Response
	 */
	public function store()
	{
		$inputID = intval(Request::input('id'));
		$inputName = Request::input('name');
		$inputHeader = Request::input('header');
		$inputCriteria = Request::input('criteria');
		$inputQuestions = Request::input('questions');
		$inputType = Request::input('type');

		if ($inputID > -1) {
			$questionaire = $this->updateQuestionaire($inputID, 
			                                          $inputName, 
			                                          $inputType, 
			                                          $inputHeader, 
			                                          $inputCriteria, 
			                                          $inputQuestions);
		} else {
			$questionaire = $this->createQuestionaire($inputName, 
			                                          $inputType, 
			                                          $inputHeader, 
			                                          $inputCriteria, 
			                                          $inputQuestions);
		}

		$ans = $questionaire->toArray();
		foreach ($ans['questions'] as &$qq) {
			$qq = $qq->toArray();
			foreach ($qq['choices'] as &$c) {
				$c = $c->toArray();

				if (isset($c['subchoices'])) {
					foreach ($c['subchoices'] as &$sc) {
						$sc = $sc->toArray();
					}
				}
				if (isset($c['inputs'])) {
					foreach ($c['inputs'] as &$i) {
						$i = $i->toArray();
					}
				}
			}
		}

		return response()->json([
			'message' => 'บันทึกข้อมูลแบบฟอร์มเสร็จสมบูรณ์',
			'results' => $ans
		]);
	}

	public function createQuestionaire($iName, $iType, $iHeader, $iCriteria, $iQuestions) {
		$questionaire = new Questionaire();
		$questionaire->name = $iName;
		$questionaire->type = $iType;
		if ($iHeader) {
			$questionaire->header = json_encode($iHeader);
		} else {
			$questionaire->header = null;
		}
		$questionaire->save();

		$questionaire->criteria = Criterion::createWith($questionaire, $iCriteria);
		$questionaire->questions = Question::createWith($questionaire, $iQuestions);

		return $questionaire;
	}

	public function updateQuestionaire($iID, $iName, $iType, $iHeader, $iCriteria, $iQuestions) {
		$questionaire = Questionaire::find($iID);
		$questionaire->name = $iName;
		$questionaire->type = $iType;
		if ($iHeader) {
			$questionaire->header = json_encode($iHeader);
		} else {
			$questionaire->header = null;
		}
		$questionaire->save();

		$questionaire->criteria = Criterion::updateWith($questionaire, $iCriteria);
		$questionaire->questions = Question::updateWith($questionaire, $iQuestions);

		return $questionaire;
	}

	public function all()
	{
		$user = Auth::user();
		$searchLevel = (!!$user) ? $user->level : 0;
		$query = Questionaire::with('criteria', 'questions')->where('level', '<=', $searchLevel);
		$questionaires = $query->get();

		foreach ($questionaires as $qq) {
			foreach ($qq->questions as $q) {
				$q->choices = Choice::with('subchoices', 'inputs')
									->where('questionID', $q->id)
									->whereNull('parentID')
									->get();
			}
		}

		return response()->json($questionaires);
	}

	/**
	 * Submit form results this implies the followings
	 * - Saving answers (the choices that user made)
	 * - Saving answers' addiontal inputs (if any)
	 * - Saving results (the value of the calculation)
	 */
	public function submit()
	{
		$choices 		= Request::input('choices');

		$questionaire	= $this->prepareQuestionaire();
		$participant 	= Participant::createOrUpdateWithRequest();

		// Retain only one copy of question answers of each participant
		ParticipantAnswer::where('participantID', $participant->id)
						 ->where('questionaireID', $questionaire->id)
						 ->delete();

		QuestionaireResult::where('participantID', $participant->id)
						  ->where('questionaireID', $questionaire->id)
						  ->delete();

		$answers		= ParticipantAnswer::createWith($questionaire, $participant, $choices);
		$summation		= Choice::summationFromChoices($choices);

		$qr					= new QuestionaireResult();
		$qr->participantID 	= $participant->id;
		$qr->questionaireID = $questionaire->id;
		$qr->value			= $summation;
		$qr->academicYear 	= Cache::get('settings.current_academic_year');

		if (!$qr->academicYear) {
			$qr->academicYear = $participant->academicYear;
		}

		$qr->save(); 

		return response()->json([
			'results' => $questionaire,
			'message' => 'บันทึกข้อมูลแบบฟอร์มเสร็จสมบูรณ์'
		]);
	}

	private function prepareQuestionaire() {
		$id = Request::input('formID');
		$questionaire = Questionaire::find($id);

		if (!$questionaire) {
			throw new \Exception('Questionaire does not existed');
		}

		return $questionaire;
	}

	public function answers($questionaireID, $academicYear, $participantID)
	{
		if ($academicYear == -999) {
			$academicYear = Cache::get('settings.current_academic_year');
		}

		$participant = Participant::where('identifier', $participantID)
								  ->first();

		if ($participant) {
			$answers = ParticipantAnswer::with('inputs')
										->where('questionaireID', $questionaireID)
										->where('participantID', $participant->id)
										->where('academicYear', $academicYear)
										->get();
		}

		return response()->json([
		                        'message' => '',
		                        'results' => $answers
		                        ]);
	}
}
