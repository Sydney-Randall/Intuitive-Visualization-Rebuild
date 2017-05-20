/*
 A class that holds student data.
 STUDENTS is an array that holds the students a teacher has.
 */

export const STUDENTS: Student[] = [];

export class Student {
  id: string;
  firstName: string;
  lastName: string;
  reportingGrade: string;
  districtID: string;
  schoolID: string;
  classID: string;

  constructor(id: string, firstName: string, lastName: string, reportingGrade: string, districtID: string, schoolID: string, classID: string) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.reportingGrade = reportingGrade;
    this.classID = classID;
    this.districtID = districtID;
    this.schoolID = schoolID;
  }
}
