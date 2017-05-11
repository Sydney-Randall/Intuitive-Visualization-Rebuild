export const TEACHERS: Teacher[] = [];

export class Teacher {
    id: string;
    firstName: string;
    lastName: string;
    className: string;
    classID: string;
    districtID: string;
    schoolID: string;

    constructor(firstName: string, lastName: string, id: string, className: string, classID: string, districtID: string, schoolID: string) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.className = className;
        this.classID = classID;
        this.districtID = districtID;
        this.schoolID = schoolID;
    }
}