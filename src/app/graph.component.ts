import { Component, Input, OnInit, OnChanges} from '@angular/core';
import { Http, Response } from '@angular/http';
import { Teacher, TEACHERS } from './teacher';
import { Student, STUDENTS } from './student';
import { Test, TESTS, StudentTESTS } from './tests';
import { StudentService} from './student.service';
import { RadarData } from './radar-data';
import { DataEntry } from './data-entry';
import { Router, ActivatedRoute, Params } from '@angular/router';
import * as d3 from 'd3';

@Component({
    selector: 'my-graphs',
    //templateUrl: 'app/graph.component.html',
    template: `
        <div>
          <div style="float:left;">
            <line-graph [testData]="selectedTests"></line-graph>
            <br>
            <select [(ngModel)]="selected" (change)="changeTests()"> 
              <option *ngFor="let category of categories" value="{{category}}">
                {{category}}
              </option>
            </select>
          </div>
          <div style="float:left;">
            <radar-chart [radarData]="selectedRadData"></radar-chart>
            <select [(ngModel)]="radSel" (change)="changeRadarData()">
              <option *ngFor="let category of radCat" value="{{category}}">
                {{category}}
              </option>
            </select>
           </div>
        </div>
        <br>
        <div style="float:left;">
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
        </div>
    `
})

export class GraphComponent implements OnInit{
    tests = StudentTESTS;
    selectedTests: Test[] = this.tests;
    currentStudent: Student;
    id: string;
    categories = ['MATH', 'ENGLISH'];
    selected: string = 'MATH';

    //radar chart values
    radCat = ['CLASS', 'SCHOOL'];
    radSel: string = 'CLASS';

    //test way of entering data while I get radar chart working
    studentData: DataEntry[] = [
      new DataEntry('MATH', 50),
      new DataEntry('ENGLISH', 50),
      new DataEntry('SCIENCE', 50),
      new DataEntry('ATTENDANCE', 50),
      new DataEntry('SOC. STUDIES', 50)
    ];
    classData: DataEntry[] = [
      new DataEntry('MATH', 75),
      new DataEntry('ENGLISH', 75),
      new DataEntry('SCIENCE', 75),
      new DataEntry('ATTENDANCE', 75),
      new DataEntry('SOC. STUDIES', 75)
    ];
    schoolData: DataEntry[] = [
      new DataEntry('MATH', 100),
      new DataEntry('ENGLISH', 100),
      new DataEntry('SCIENCE', 100),
      new DataEntry('ATTENDANCE', 100),
      new DataEntry('SOC. STUDIES', 100)
    ];

    stuAvgRadData: RadarData = new RadarData('Student Averages', this.studentData);
    classAvgRadData: RadarData = new RadarData('Class Averages', this.classData);
    schoolAvgRadData: RadarData = new RadarData('School Averages', this.schoolData);

    selectedRadData: RadarData[] = [
      this.stuAvgRadData,
      this.classAvgRadData
    ];

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
        this.changeTests();
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

    changeRadarData() {
      if(this.radSel == 'CLASS'){
        this.selectedRadData = [
          this.stuAvgRadData,
          this.classAvgRadData 
        ];
      } else if(this.radSel == 'SCHOOL'){
        this.selectedRadData = [
          this.stuAvgRadData,
          this.schoolAvgRadData
        ];
      }
    }

}

