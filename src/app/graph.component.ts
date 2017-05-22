import { Component, Input, OnInit, OnChanges, ViewChild, ElementRef, AfterViewChecked} from '@angular/core';
import { Http, Response } from '@angular/http';
import { Teacher, TEACHERS } from './teacher';
import { Student, STUDENTS } from './student';
import { Test, TESTS, StudentTESTS } from './tests';
import { StudentService} from './student.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Stocks } from './data';
import * as d3 from 'd3';

@Component({
    selector: 'my-graphs',
    //templateUrl: 'app/graph.component.html',
    template: `
        <svg width="900" height="500"></svg>

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

export class GraphComponent implements OnInit, OnChanges, AfterViewChecked {
    @ViewChild('graphContainer') graphContainer: ElementRef;
    tests = StudentTESTS;
    currentStudent: Student;
    id: string;

    private margin = { top: 20, right: 20, bottom: 30, left: 50 };
    private width: number;
    private height: number;
    private x: any;
    private y: any;
    private svg: any;
    private line: d3.Line<[number, number]>;
    private data: any[];

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private service: StudentService) {
        this.route.params.subscribe(params => {
            this.id = params['id'];
        });
        this.width = 900 - this.margin.left - this.margin.right;
        this.height = 500 - this.margin.top - this.margin.bottom;
        /*for(let test of this.tests) {
          let taken = this.convertDate(test);
          let percentage = this.convertPercent(test);
          console.log("hey");
          console.log(taken);
        }*/
    }

    ngOnInit() {
        this.currentStudent = this.service.getStudent(this.id);
        this.initSvg();
        this.sortTestBySubject();
        this.compareTestLevels();
    }

    ngOnChanges() {
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

    ngAfterViewChecked() {
        this.initAxis();
        this.drawAxis();
        this.drawLine();
    }
    private convertDate(d: Test): Date {
        let parts = d.taken.split('/');
        let returnDate = new Date(+parts[2], +parts[0] - 1, +parts[1]);
        console.log(returnDate);
        return returnDate;
    }

    private convertPercent(d: Test): number {
        return +d.percentage;
    }

    private initSvg() {
        this.svg = d3.select("svg")
            .append("g")
            .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");;
    }

    private initAxis() {
        this.x = d3.scaleTime().range([0, this.width]);
        this.y = d3.scaleLinear().range([this.height, 0]);
        this.x.domain(d3.extent(this.tests, this.convertDate));
        this.y.domain(d3.extent([0, 100]));
    }

    private drawAxis() {

        this.svg.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", "translate(0," + this.height + ")")
            .call(d3.axisBottom(this.x));

        this.svg.append("g")
            .attr("class", "axis axis--y")
            .call(d3.axisLeft(this.y))
            .append("text")
            .attr("class", "axis-title")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("Percentage (%)");
    }

    private drawLine() {
        this.line = d3.line()
            .x((d: any) => {
                return this.x(this.convertDate(d));
            })
            .y((d: any) => {
                return this.y(this.convertPercent(d));
            });

        this.svg.append("path")
            .datum(this.tests)
            .attr("class", "line")
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("d", this.line);
    }
}

