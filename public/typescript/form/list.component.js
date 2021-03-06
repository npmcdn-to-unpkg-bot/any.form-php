System.register(['angular2/core', '../service/form.service', 'angular2/router'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, form_service_1, router_1;
    var FormListComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (form_service_1_1) {
                form_service_1 = form_service_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            FormListComponent = (function () {
                function FormListComponent(_service) {
                    this._service = _service;
                }
                FormListComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this._service.load()
                        .subscribe(function (data) {
                        _this.forms = data.json();
                    });
                };
                FormListComponent = __decorate([
                    core_1.Component({
                        templateUrl: 'template/form/list',
                        providers: [form_service_1.FormService],
                        directives: [router_1.ROUTER_DIRECTIVES]
                    }), 
                    __metadata('design:paramtypes', [form_service_1.FormService])
                ], FormListComponent);
                return FormListComponent;
            }());
            exports_1("FormListComponent", FormListComponent);
        }
    }
});
