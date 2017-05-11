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
var http_1 = require('@angular/http');
var router_1 = require('@angular/router');
var teacher_1 = require('./teacher');
var student_1 = require('./student');
var tests_1 = require('./tests');
var TeacherComponent = (function () {
    function TeacherComponent(http, router) {
        this.http = http;
        this.router = router;
        this.teachers = teacher_1.TEACHERS;
        this.csvTeacherUrl = 'data/TeacherFields.csv'; // URL to web API
        this.csvTeacherData = [];
        this.csvStudentUrl = 'data/StudentFields.csv'; // URL to web API
        this.csvStudentData = [];
        this.csvTestUrl = 'data/StudentTestResults.csv'; // URL to web API
        this.csvTestData = [];
    }
    //selection for teachers
    TeacherComponent.prototype.onSelectTeacher = function (teacher) {
        this.selectedTeacher = teacher;
        this.readStudentCsvData();
        this.router.navigate(['/students', teacher.id]);
    };
    //reads teacher data on startup
    TeacherComponent.prototype.ngOnInit = function () {
        this.readTeacherCsvData();
        this.readTestCsvData();
    };
    //get the tests of a certain class into an array
    TeacherComponent.prototype.getClassTests = function () {
        tests_1.ClassTESTS.splice(0, tests_1.ClassTESTS.length);
        for (var i = 0; i < student_1.STUDENTS.length; i++) {
            for (var j = 0; j < tests_1.TESTS.length; j++) {
                if (tests_1.TESTS[j].id == student_1.STUDENTS[i].id) {
                    tests_1.ClassTESTS.push(tests_1.TESTS[j]);
                }
            }
        }
    };
    //calculate school average for each test
    TeacherComponent.prototype.calculateSchoolAVG = function () {
        for (var i = 0; i < tests_1.TESTS.length; i++) {
            tests_1.TESTS[i].schoolAverage = 0;
            for (var j = 0; j < tests_1.TESTS.length; j++) {
                if (tests_1.TESTS[i].desc == tests_1.TESTS[j].desc && tests_1.TESTS[i].abbreviation == tests_1.TESTS[j].abbreviation && tests_1.TESTS[i].grade == tests_1.TESTS[j].grade) {
                    tests_1.TESTS[i].averageCounter++;
                    tests_1.TESTS[i].schoolAverage += tests_1.TESTS[j].percentage;
                }
            }
            tests_1.TESTS[i].schoolAverage = tests_1.TESTS[i].schoolAverage / tests_1.TESTS[i].averageCounter;
            tests_1.TESTS[i].averageCounter = 0;
        }
    };
    //calculate class average for each test
    TeacherComponent.prototype.calculateClassAVG = function () {
        for (var i = 0; i < tests_1.ClassTESTS.length; i++) {
            tests_1.ClassTESTS[i].classAverage = 0;
            for (var j = 0; j < tests_1.ClassTESTS.length; j++) {
                if (tests_1.ClassTESTS[i].desc == tests_1.ClassTESTS[j].desc && tests_1.ClassTESTS[i].abbreviation == tests_1.ClassTESTS[j].abbreviation && tests_1.ClassTESTS[i].grade == tests_1.ClassTESTS[j].grade) {
                    tests_1.ClassTESTS[i].averageCounter++;
                    tests_1.ClassTESTS[i].classAverage += tests_1.ClassTESTS[j].percentage;
                }
            }
            tests_1.ClassTESTS[i].classAverage = tests_1.ClassTESTS[i].classAverage / tests_1.ClassTESTS[i].averageCounter;
            tests_1.ClassTESTS[i].averageCounter = 0;
        }
    };
    //function to read teacher data from CSV
    TeacherComponent.prototype.readTeacherCsvData = function () {
        var _this = this;
        this.http.get(this.csvTeacherUrl)
            .subscribe(function (data) { return _this.extractTeacherData(data); }, function (err) { return _this.handleError(err); });
    };
    //function to extract teacher data from CSV
    TeacherComponent.prototype.extractTeacherData = function (res) {
        teacher_1.TEACHERS.splice(0, teacher_1.TEACHERS.length);
        var csvTeacherData = res['_body'] || '';
        var allTextLines = csvTeacherData.split(/\r\n|\n/);
        var headers = allTextLines[0].split(',');
        var lines = [];
        for (var i = 0; i < allTextLines.length; i++) {
            // split content based on comma
            var data = allTextLines[i].split(',');
            if (data.length == headers.length) {
                var tarr = [];
                for (var j = 0; j < headers.length; j++) {
                    tarr.push(data[j]);
                }
                if (i > 0) {
                    var teacher = new teacher_1.Teacher(data[0], data[1], data[2], data[3], data[4], data[5], data[6]);
                    teacher_1.TEACHERS.push(teacher);
                    lines.push(tarr);
                }
            }
        }
        this.csvTeacherData = lines;
    };
    //function to read student data from CSV
    TeacherComponent.prototype.readStudentCsvData = function () {
        var _this = this;
        this.http.get(this.csvStudentUrl)
            .subscribe(function (data) { return _this.extractStudentData(data); }, function (err) { return _this.handleError(err); });
    };
    //function to extract student data from CSV
    //only pushes student data into the array if the class ID matches that of the selected teacher
    TeacherComponent.prototype.extractStudentData = function (res) {
        student_1.STUDENTS.splice(0, student_1.STUDENTS.length);
        var csvStudentData = res['_body'] || '';
        var allTextLines = csvStudentData.split(/\r\n|\n/);
        var headers = allTextLines[0].split(',');
        var lines = [];
        for (var i = 0; i < allTextLines.length; i++) {
            // split content based on comma
            var data = allTextLines[i].split(',');
            if (data.length == headers.length) {
                var tarr = [];
                for (var j = 0; j < headers.length; j++) {
                    tarr.push(data[j]);
                }
                if (data[6] == this.selectedTeacher.classID) {
                    if (i > 0) {
                        var student = new student_1.Student(data[0], data[1], data[2], data[3], data[4], data[5], data[6]);
                        student_1.STUDENTS.push(student);
                        lines.push(tarr);
                    }
                }
            }
        }
        this.csvStudentData = lines;
        //force these functions to get called after all the student data has been read in
        //because for whatever reason, it's calling them first if done in onSelectTeacher
        this.getClassTests();
        this.calculateSchoolAVG();
        this.calculateClassAVG();
    };
    //function to read test data from CSV
    TeacherComponent.prototype.readTestCsvData = function () {
        var _this = this;
        this.http.get(this.csvTestUrl)
            .subscribe(function (data) { return _this.extractTestData(data); }, function (err) { return _this.handleError(err); });
    };
    //function to extract test data from CSV
    TeacherComponent.prototype.extractTestData = function (res) {
        tests_1.TESTS.splice(0, tests_1.TESTS.length);
        var csvTestData = res['_body'] || '';
        var allTextLines = csvTestData.split(/\r\n|\n/);
        var headers = allTextLines[0].split(',');
        var lines = [];
        for (var i = 0; i < allTextLines.length; i++) {
            // split content based on comma
            var data = allTextLines[i].split(',');
            if (data.length == headers.length) {
                var tarr = [];
                for (var j = 0; j < headers.length; j++) {
                    tarr.push(data[j]);
                }
                if (i > 0) {
                    var test = new tests_1.Test(data[0], data[1], data[2], data[3], data[4], data[5], data[6], data[7]);
                    tests_1.TESTS.push(test);
                    lines.push(tarr);
                }
            }
        }
        this.csvTestData = lines;
    };
    //Error handler
    TeacherComponent.prototype.handleError = function (error) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        var errMsg = (error.message) ? error.message :
            error.status ? error.status + " - " + error.statusText : 'Server error';
        console.error(errMsg); // log to console instead
        return errMsg;
    };
    TeacherComponent = __decorate([
        core_1.Component({
            selector: 'my-teachers',
            template: "\n        <ul class=\"teachers\">\n            <li *ngFor=\"let teacher of teachers\"\n                [class.selected]=\"teacher === selectedTeacher\"\n                (click)=\"onSelectTeacher(teacher)\">\n                {{teacher.firstName}} {{teacher.lastName}}\n            </li>\n        </ul>\n        ",
            styles: ["\n      .selected {\n        background-color: #CFD8DC !important;\n        color: white;\n      }\n      .teachers {\n        margin: 0 0 2em 0;\n        list-style-type: none;\n        padding: 0;\n        width: 15em;\n      }\n      .teachers li {\n        cursor: pointer;\n        position: relative;\n        left: 0;\n        background-color: #EEE;\n        margin: .5em;\n        padding: .3em 0;\n        height: 1.6em;\n        border-radius: 4px;\n      }\n      .teachers li.selected:hover {\n        background-color: #BBD8DC !important;\n        color: white;\n      }\n      .teachers li:hover {\n        color: #607D8B;\n        background-color: #DDD;\n        left: .1em;\n      }\n      .teachers .text {\n        position: relative;\n        top: -3px;\n      }\n      .teachers .badge {\n        display: inline-block;\n        font-size: small;\n        color: white;\n        padding: 0.8em 0.7em 0 0.7em;\n        background-color: #607D8B;\n        line-height: 1em;\n        position: relative;\n        left: -1px;\n        top: -4px;\n        height: 1.8em;\n        margin-right: .8em;\n        border-radius: 4px 0 0 4px;\n      }\n    "]
        }), 
        __metadata('design:paramtypes', [http_1.Http, router_1.Router])
    ], TeacherComponent);
    return TeacherComponent;
}());
exports.TeacherComponent = TeacherComponent;
//# sourceMappingURL=teachers.component.js.map