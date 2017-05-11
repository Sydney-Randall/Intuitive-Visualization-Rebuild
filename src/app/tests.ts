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
    percentage: number;
    classAverage: number;
    schoolAverage: number;
    averageCounter: number;

    constructor(id: string, taken: string, desc: string, schoolYear: string, grade: string, abbreviation: string, score: string, maxScore: string) {
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

    private convertToPercentage(){
        var numScore = +this.score;
        var numMaxScore = +this.maxScore;
        this.percentage = (numScore / numMaxScore) * 100;
    }
}