/*
A class that holds test data.
TESTS is every test available in the CSV file.
StudentTESTS is an array of the tests only held by a student.
ClassTESTS is an array of the tests held by an entire class.
 */

export const TESTS: Test[] = [];

export const StudentTESTS: Test[] = [];

export const ClassTESTS: Test[] = [];

export class Test {
    id: string;
    taken: string;
    desc: string;
    schoolYear: string;
    grade: string;
    abbreviation: string;
    score: string;
    maxScore: string;
    fullName: string;
    level: string;
    percentage: number;
    classAverage: number;
    schoolAverage: number;
    averageCounter: number;
    levelText: string;
    levelColor: string;

    constructor(id: string, taken: string, desc: string, schoolYear: string, grade: string, abbreviation: string, score: string, maxScore: string, fullName: string, level: string) {
        this.id = id;
        this.taken = taken;
        this.desc = desc;
        this.schoolYear = schoolYear;
        this.grade = grade;
        this.abbreviation = abbreviation;
        this.score = score;
        this.maxScore = maxScore;
        this.fullName = fullName;
        this.level = level;
        this.averageCounter = 0;
        this.convertToPercentage();
        this.setLevelText();
    }

    /*
    Numbers brought in by CSV file are all strings, convert to a percentage that is ACTUALLY a number
     */
    private convertToPercentage() {
        var numScore = +this.score;
        var numMaxScore = +this.maxScore;
        this.percentage = (numScore / numMaxScore) * 100;
    }

    /*
    Set the text that corresponds to the score level and the color
     */
    private setLevelText() {
      if (this.level == 'L1') {
        this.levelText = 'Below Basic';
        this.levelColor = 'red';
      }
      if (this.level == 'L2') {
        this.levelText = 'Basic';
        this.levelColor = 'darkorange';
      }
      if (this.level == 'L3') {
        this.levelText = 'Proficient';
        this.levelColor = 'blue';
      }
      if (this.level == 'L4') {
        this.levelText = 'Advanced';
        this.levelColor = 'limegreen';
      }
    }
}
