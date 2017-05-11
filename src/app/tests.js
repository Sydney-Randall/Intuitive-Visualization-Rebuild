"use strict";
exports.TESTS = [];
exports.StudentTESTS = [];
exports.ClassTESTS = [];
var Test = (function () {
    function Test(id, taken, desc, schoolYear, grade, abbreviation, score, maxScore) {
        this.id = id;
        this.taken = taken;
        this.desc = desc;
        this.schoolYear = schoolYear;
        this.grade = grade;
        this.abbreviation = abbreviation;
        this.score = score;
        this.maxScore = maxScore;
        this.averageCounter = 0;
        this.convertToPercentage();
    }
    Test.prototype.convertToPercentage = function () {
        var numScore = +this.score;
        var numMaxScore = +this.maxScore;
        this.percentage = (numScore / numMaxScore) * 100;
    };
    return Test;
}());
exports.Test = Test;
//# sourceMappingURL=tests.js.map