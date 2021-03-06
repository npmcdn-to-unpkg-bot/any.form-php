///<reference path="../../../node_modules/angular2/typings/browser.d.ts"/>
System.register(['angular2/platform/browser', 'angular2/Http', './app.component', './app.routes'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var browser_1, Http_1, app_component_1, app_routes_1;
    return {
        setters:[
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (Http_1_1) {
                Http_1 = Http_1_1;
            },
            function (app_component_1_1) {
                app_component_1 = app_component_1_1;
            },
            function (app_routes_1_1) {
                app_routes_1 = app_routes_1_1;
            }],
        execute: function() {
            browser_1.bootstrap(app_component_1.AppComponent, [app_routes_1.APP_ROUTER_PROVIDERS, Http_1.HTTP_PROVIDERS])
                .catch(function (err) { return console.error(err); });
        }
    }
});
