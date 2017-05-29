import { Component, Input, OnInit, OnChanges} from '@angular/core';
import { Http, Response } from '@angular/http';
import { Teacher, TEACHERS } from './teacher';
import { Student, STUDENTS } from './student';
import { Test, TESTS, StudentTESTS } from './tests';
import { StudentService} from './student.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import * as d3 from 'd3';

@Component({
    selector: 'my-graphs',
    //templateUrl: 'app/graph.component.html',
    template: `
        <line-graph [testData]="selectedTests"></line-graph>
        <select [(ngModel)]="selected" (change)="changeTests()"> 
          <option *ngFor="let category of categories" value="{{category}}">
            {{category}}
          </option>
        </select>
        <div *ngIf="currentStudent">
          <h2>{{currentStudent.firstName}} {{currentStudent.lastName}}</h2>
          <div>
            <label>ID: </label>{{currentStudent.id}}
            <br>
            <label>Current Grade: </label>{{currentStudent.reportingGrade}}
          </div>
        </div>
        <h4>Standardized Test Results</h4>
        <ul class="tests">
            <li *ngFor="let test of tests">
                {{test.fullName}} {{test.desc}} {{test.taken}}
            <br>
              <h4 [ngStyle]="{'color': test.levelColor, 'margin-bottom': 0}">
                    {{test.levelText}} : {{test.level}}
              </h4>
              <h4 [ngStyle]="{'color': test.compareColor, 'margin-top': 0}">
                    {{test.compareText}}
              </h4>
            </li>
        </ul>
    `
})

export class GraphComponent implements OnInit{
    tests = StudentTESTS;
    selectedTests: Test[] = this.tests;
    currentStudent: Student;
    id: string;
    categories = ['MATH', 'ENGLISH'];
    selected: string = 'MATH'


    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private service: StudentService) {
        this.route.params.subscribe(params => {
            this.id = params['id'];
        });
    }

    ngOnInit() {
        this.currentStudent = this.service.getStudent(this.id);
        this.sortTestBySubject();
        this.compareTestLevels();
    }


    // Function to sort the tests by subject, same as function used to sort students by last name
    sortTestBySubject() {
      StudentTESTS.sort(function(a, b){
        var nameA = a.desc.toLowerCase(), nameB = b.desc.toLowerCase();
        if (nameA < nameB)
          return -1;
        if (nameA > nameB)
          return 1;
        return 0;
      });
    }

    // Function that compares the level obtained on a test to the previous one and determines how they compare.
    compareTestLevels() {
        for (let i = 0; i < StudentTESTS.length; i++) {
          if (i === 0 || StudentTESTS[i].desc !== StudentTESTS[i - 1].desc) {
            StudentTESTS[i].compareText = 'No previous test data';
          } else if (StudentTESTS[i].desc === StudentTESTS[i - 1].desc) {
            if (StudentTESTS[i].levelNumber === StudentTESTS[i - 1].levelNumber) {
              StudentTESTS[i].compareText = 'Steady';
              StudentTESTS[i].compareColor = 'blue';
            }
            if (StudentTESTS[i].levelNumber < StudentTESTS[i - 1].levelNumber) {
              StudentTESTS[i].compareText = 'Declining';
              StudentTESTS[i].compareColor = 'red';
            }
            if (StudentTESTS[i].levelNumber > StudentTESTS[i - 1].levelNumber) {
              StudentTESTS[i].compareText = 'Improving';
              StudentTESTS[i].compareColor = 'limegreen';
            }
          }
        }
    }

    changeTests() {
      this.selectedTests = this.tests.filter((test) => {
        return test.desc.indexOf(this.selected) > -1;
      });
    }
}

