"use strict";
exports.STUDENTS = [];
var Student = (function () {
    function Student(id, firstName, lastName, reportingGrade, districtID, schoolID, classID) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.reportingGrade = reportingGrade;
        this.classID = classID;
        this.districtID = districtID;
        this.schoolID = schoolID;
    }
    return Student;
}());
exports.Student = Student;
//# sourceMappingURL=student.js.map