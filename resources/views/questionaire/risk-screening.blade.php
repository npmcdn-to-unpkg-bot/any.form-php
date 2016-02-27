@extends((Request::ajax()) ? 'nilview' : 'app')
@section('content')
<div class="container form-list" risk-screening>
	<h3>แบบคัดกรองนักเรียนรายบุคคล</h3>
	<hr />
	<form>
		<div class="col-xs-12" style="padding: 0">

			<!-- <table class="name col-xs-4 pull-right"> -->
			<table class="name col-xs-12">
				<tr>
					<td class="" style="width: 10em">
						<input 	class="text-center" 
								type="number" 
								placeholder="หมายเลขประจำตัว"
								ng-model="participant.identifier" />
					</td>
					<td class="">
						<input ng-model="participant.firstname"
							   placeholder="ชื่อ" />
					</td>
					<td class="">
						<input ng-model="participant.lastname"
							   placeholder="สกุล" />
					</td>
					<td class="" style="width:7%">
						<input class="text-center" 
							   ng-model="participant.class"
							   placeholder="ชั้นปี" />
					</td>
					<td class="" style="width:7%">
						<input class="text-center" 
							   ng-model="participant.room"
							   placeholder="ห้อง" />
					</td>
					<td class="" style="width:7%">
						<input class="text-center" 
							   ng-model="participant.room"
							   placeholder="เลขที่" />
					</td>
				</tr>
			</table>

		</div>

		<br/><br/><br/>

		<div class="col-xs-12" style="padding: 0" ng-repeat="q in screening.questions">

			<div class="col-xs-12 font-weight-bold std-pad indent-1" style="background: #eee">
				[[ q.label+' '+q.name ]]
			</div>

			<div ng-switch="q.type">
				<div ng-switch-when="0" class="col-xs-12 std-pad">
					<table>
						<tr ng-repeat="c in q.choices">
							<td style="width:42px;">
								<input type="radio" name="[[ q.name ]]" ng-model="hasTalent" value="1" /> 	
							</td>		
							<td>
								[[ c.name ]]
							</td>
							<td ng-if="c.additionalInputs.length > 0">
								<div ng-repeat="i in c.additionalInputs">
									<input class="col-xs-5 space-left" 
										   ng-model="i.value" 
										   placeholder="i.name" />
								</div>
							</td>
						</tr>
					</table>
				</div>
				<div ng-switch-when="1" class="col-xs-10 col-xs-offset-1 std-pad">
					<div class="col-xs-6 indent-2 std-pad" ng-repeat="c in q.choices">
						<input type="checkbox" ng-model="c.selected"> [[ c.name ]]
					</div>
				</div>
				<div ng-switch-when="2" class="col-xs-12 std-pad">
					<table class="subject">
						<tr>
							<th class="col-xs-4" ng-repeat="c in q.choices">
								<input type="checkbox" ng-model="c.selected"> [[ c.name ]]
							</th>
						</tr>
						<tr>
							<td ng-repeat="c in q.choices">
								<table class="item" ng-repeat="sc in c.subchoices">
									<tr>
										<td><input type="checkbox" ng-model="sc.checked"></td>
										<td>[[ sc.name ]]</td>
										<td ng-if="sc.additionalInputs.length > 0">
											<div ng-repeat="i in sc.additionalInputs">
												<input class="col-xs-5 space-left" 
													   ng-model="i.value" 
													   placeholder="i.name" />
											</div>
										</td>
									</tr>
								</table>
							</td>
						</tr>
					</table>
				</div>
				<div ng-switch-default>
					Unknown Question Type
				</div>
			</div>

		</div>
	</form>

</div>
@endsection