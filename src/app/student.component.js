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
var router_1 = require('@angular/router');
var student_1 = require('./student');
var tests_1 = require('./tests');
var student_service_1 = require('./student.service');
var StudentComponent = (function () {
    function StudentComponent(router, studentService) {
        this.router = router;
        this.studentService = studentService;
        this.students = student_1.STUDENTS;
        this.tests = tests_1.ClassTESTS;
    }
    StudentComponent.prototype.onSelectStudent = function (student) {
        this.selectedStudent = student;
        this.getTestData();
        this.router.navigate(['/graph', student.id]);
    };
    StudentComponent.prototype.getStudents = function () {
        this.students = this.studentService.getStudents();
    };
    StudentComponent.prototype.ngOnInit = function () {
        this.getStudents();
    };
    //get the individual student tests into an array
    StudentComponent.prototype.getTestData = function () {
        tests_1.StudentTESTS.splice(0, tests_1.StudentTESTS.length);
        for (var i = 0; i < tests_1.TESTS.length; i++) {
            if (tests_1.TESTS[i].id == this.selectedStudent.id) {
                tests_1.StudentTESTS.push(tests_1.TESTS[i]);
            }
        }
    };
    StudentComponent = __decorate([
        core_1.Component({
            selector: 'my-students',
            template: "\n        <ul class=\"students\">\n            <li *ngFor=\"let student of students\"\n                [class.selected]=\"student === selectedStudent\"\n                (click)=\"onSelectStudent(student)\">\n                {{student.firstName}} {{student.lastName}}\n            </li>\n        </ul>\n        ",
            styles: ["\n      .selected {\n        background-color: #CFD8DC !important;\n        color: white;\n      }\n      .students {\n        margin: 0 0 2em 0;\n        list-style-type: none;\n        padding: 0;\n        width: 15em;\n      }\n      .students li {\n        cursor: pointer;\n        position: relative;\n        left: 0;\n        background-color: #EEE;\n        margin: .5em;\n        padding: .3em 0;\n        height: 1.6em;\n        border-radius: 4px;\n      }\n      .students li.selected:hover {\n        background-color: #BBD8DC !important;\n        color: white;\n      }\n      .students li:hover {\n        color: #607D8B;\n        background-color: #DDD;\n        left: .1em;\n      }\n      .students .text {\n        position: relative;\n        top: -3px;\n      }\n      .students .badge {\n        display: inline-block;\n        font-size: small;\n        color: white;\n        padding: 0.8em 0.7em 0 0.7em;\n        background-color: #607D8B;\n        line-height: 1em;\n        position: relative;\n        left: -1px;\n        top: -4px;\n        height: 1.8em;\n        margin-right: .8em;\n        border-radius: 4px 0 0 4px;\n      }\n    "]
        }), 
        __metadata('design:paramtypes', [router_1.Router, student_service_1.StudentService])
    ], StudentComponent);
    return StudentComponent;
}());
exports.StudentComponent = StudentComponent;
//# sourceMappingURL=student.component.js.map