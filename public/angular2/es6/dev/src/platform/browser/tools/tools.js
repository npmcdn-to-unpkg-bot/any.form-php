import { global } from 'angular2/src/facade/lang';
import { AngularTools } from './common_tools';
var context = global;
/**
 * Enabled Angular 2 debug tools that are accessible via your browser's
 * developer console.
 *
 * Usage:
 *
 * 1. Open developer console (e.g. in Chrome Ctrl + Shift + j)
 * 1. Type `ng.` (usually the console will show auto-complete suggestion)
 * 1. Try the change detection profiler `ng.profiler.timeChangeDetection()`
 *    then hit Enter.
 */
export function enableDebugTools(ref) {
    context.ng = new AngularTools(ref);
}
/**
 * Disables Angular 2 tools.
 */
export function disableDebugTools() {
    delete context.ng;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkaWZmaW5nX3BsdWdpbl93cmFwcGVyLW91dHB1dF9wYXRoLXhCTElCclZSLnRtcC9hbmd1bGFyMi9zcmMvcGxhdGZvcm0vYnJvd3Nlci90b29scy90b29scy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLDBCQUEwQjtPQUV4QyxFQUFDLFlBQVksRUFBQyxNQUFNLGdCQUFnQjtBQUUzQyxJQUFJLE9BQU8sR0FBUSxNQUFNLENBQUM7QUFFMUI7Ozs7Ozs7Ozs7R0FVRztBQUNILGlDQUFpQyxHQUFpQjtJQUNoRCxPQUFPLENBQUMsRUFBRSxHQUFHLElBQUksWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3JDLENBQUM7QUFFRDs7R0FFRztBQUNIO0lBQ0UsT0FBTyxPQUFPLENBQUMsRUFBRSxDQUFDO0FBQ3BCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2dsb2JhbH0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcbmltcG9ydCB7Q29tcG9uZW50UmVmfSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9saW5rZXIvY29tcG9uZW50X2ZhY3RvcnknO1xuaW1wb3J0IHtBbmd1bGFyVG9vbHN9IGZyb20gJy4vY29tbW9uX3Rvb2xzJztcblxudmFyIGNvbnRleHQgPSA8YW55Pmdsb2JhbDtcblxuLyoqXG4gKiBFbmFibGVkIEFuZ3VsYXIgMiBkZWJ1ZyB0b29scyB0aGF0IGFyZSBhY2Nlc3NpYmxlIHZpYSB5b3VyIGJyb3dzZXInc1xuICogZGV2ZWxvcGVyIGNvbnNvbGUuXG4gKlxuICogVXNhZ2U6XG4gKlxuICogMS4gT3BlbiBkZXZlbG9wZXIgY29uc29sZSAoZS5nLiBpbiBDaHJvbWUgQ3RybCArIFNoaWZ0ICsgailcbiAqIDEuIFR5cGUgYG5nLmAgKHVzdWFsbHkgdGhlIGNvbnNvbGUgd2lsbCBzaG93IGF1dG8tY29tcGxldGUgc3VnZ2VzdGlvbilcbiAqIDEuIFRyeSB0aGUgY2hhbmdlIGRldGVjdGlvbiBwcm9maWxlciBgbmcucHJvZmlsZXIudGltZUNoYW5nZURldGVjdGlvbigpYFxuICogICAgdGhlbiBoaXQgRW50ZXIuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBlbmFibGVEZWJ1Z1Rvb2xzKHJlZjogQ29tcG9uZW50UmVmKTogdm9pZCB7XG4gIGNvbnRleHQubmcgPSBuZXcgQW5ndWxhclRvb2xzKHJlZik7XG59XG5cbi8qKlxuICogRGlzYWJsZXMgQW5ndWxhciAyIHRvb2xzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZGlzYWJsZURlYnVnVG9vbHMoKTogdm9pZCB7XG4gIGRlbGV0ZSBjb250ZXh0Lm5nO1xufVxuIl19