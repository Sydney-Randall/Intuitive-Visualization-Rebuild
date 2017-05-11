"use strict";
exports.TEACHERS = [];
var Teacher = (function () {
    function Teacher(firstName, lastName, id, className, classID, districtID, schoolID) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.className = className;
        this.classID = classID;
        this.districtID = districtID;
        this.schoolID = schoolID;
    }
    return Teacher;
}());
exports.Teacher = Teacher;
//# sourceMappingURL=teacher.js.map