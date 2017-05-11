import { Component } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';
import { Teacher, TEACHERS }  from './teacher';
import { Student, STUDENTS } from './student';
import { Test, TESTS, StudentTESTS, ClassTESTS } from './tests';
import { StudentService } from './student.service';

@Component({
    selector: 'my-students',
    template: `
        <ul class="students">
            <li *ngFor="let student of students"
                [class.selected]="student === selectedStudent"
                (click)="onSelectStudent(student)">
                {{student.firstName}} {{student.lastName}}
            </li>
        </ul>
        `,
    styles: [`
      .selected {
        background-color: #CFD8DC !important;
        color: white;
      }
      .students {
        margin: 0 0 2em 0;
        list-style-type: none;
        padding: 0;
        width: 15em;
      }
      .students li {
        cursor: pointer;
        position: relative;
        left: 0;
        background-color: #EEE;
        margin: .5em;
        padding: .3em 0;
        height: 1.6em;
        border-radius: 4px;
      }
      .students li.selected:hover {
        background-color: #BBD8DC !important;
        color: white;
      }
      .students li:hover {
        color: #607D8B;
        background-color: #DDD;
        left: .1em;
      }
      .students .text {
        position: relative;
        top: -3px;
      }
      .students .badge {
        display: inline-block;
        font-size: small;
        color: white;
        padding: 0.8em 0.7em 0 0.7em;
        background-color: #607D8B;
        line-height: 1em;
        position: relative;
        left: -1px;
        top: -4px;
        height: 1.8em;
        margin-right: .8em;
        border-radius: 4px 0 0 4px;
      }
    `]
})
export class StudentComponent {
    students = STUDENTS;
    selectedStudent: Student;
    tests = ClassTESTS;
    id: string;

    onSelectStudent(student: Student): void {
        this.selectedStudent = student;
        this.getTestData();
        this.router.navigate(['/graph', student.id]);
    }

    getStudents(): void {
        this.students = this.studentService.getStudents();
    }

    ngOnInit(): void {
        this.getStudents();
    }

    constructor(private router: Router, private studentService: StudentService) { }

    //get the individual student tests into an array
    private getTestData() {
        StudentTESTS.splice(0, StudentTESTS.length);

        for (let i = 0; i < TESTS.length; i++) {
            if (TESTS[i].id == this.selectedStudent.id) {
                StudentTESTS.push(TESTS[i]);
            }
        }
    }
}