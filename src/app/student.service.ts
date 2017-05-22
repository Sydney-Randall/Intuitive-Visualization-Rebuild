/*
Used to return the arrays of students, depending on what is needed
 */

import { Injectable } from '@angular/core';
import { Student, STUDENTS} from './student';

@Injectable()
export class StudentService {
    currentStudent: Student;

    // Return the whole array of students
    getStudents(): Student[] {
        return STUDENTS;
    }

    // Return a specific student, based on ID
    getStudent(id: string): Student {
        for (let i = 0; i < STUDENTS.length; i++) {
            if (id == STUDENTS[i].id) {
                this.currentStudent = STUDENTS[i];
            }
        }
        return this.currentStudent;
    }
}
