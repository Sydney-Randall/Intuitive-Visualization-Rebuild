"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
var http_1 = require('@angular/http');
var app_component_1 = require('./app.component');
var router_1 = require("@angular/router");
var teachers_component_1 = require('./teachers.component');
var student_component_1 = require('./student.component');
var graph_component_1 = require('./graph.component');
var student_service_1 = require('./student.service');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                http_1.HttpModule,
                router_1.RouterModule.forRoot([
                    { path: 'teachers', component: teachers_component_1.TeacherComponent },
                    { path: 'students/:id', component: student_component_1.StudentComponent },
                    { path: 'graph/:id', component: graph_component_1.GraphComponent },
                    { path: '', redirectTo: '/teachers', pathMatch: 'full' } //set teacher path as default
                ])
            ],
            declarations: [app_component_1.AppComponent, teachers_component_1.TeacherComponent, student_component_1.StudentComponent, graph_component_1.GraphComponent],
            providers: [student_service_1.StudentService],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map