import { Injectable } from '@angular/core';
import { Student, STUDENTS} from './student';

@Injectable()
export class StudentService {
    currentStudent: Student;

    //return the whole array of students
    getStudents(): Student[]{
        return STUDENTS;
    }

    //return a specific student, based on ID
    getStudent(id: string): Student {
        for (let i = 0; i < STUDENTS.length; i++) {
            if (id == STUDENTS[i].id) {
                this.currentStudent = STUDENTS[i];
            }
        }
        return this.currentStudent;
    }
}