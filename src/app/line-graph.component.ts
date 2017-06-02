import { Component, Input, OnInit, AfterViewChecked } from '@angular/core';
import { Test } from './tests';
import * as d3 from 'd3';

@Component({
	selector: 'line-graph',
	template: '<svg id="line-graph" width="900" height="500"></svg>'
})

export class LineGraphComponent implements OnInit, AfterViewChecked {
	@Input() testData: Test[];

	private margin = {top: 20, right: 20, bottom: 30, left: 50};
	private width: number;
	private height: number;
	private x: any;
	private y: any;
	private svg: any;
	private line: d3.Line<[number, number]>;
	private data: any[];

	constructor() {
		this.width = 900 - this.margin.left - this.margin.right;
        this.height = 500 - this.margin.top - this.margin.bottom;
	}

	ngOnInit() {
		this.initSvg();
		
	}

	ngAfterViewChecked() {
		this.resetGraph();
		this.initAxis();
		this.drawAxis();
		this.drawLine();
	}
	private convertDate(d: Test): Date {
      let parts = d.taken.split('/');
      let returnDate = new Date(+parts[2],+parts[0]-1, +parts[1]);
      return returnDate;
    }

    private convertPercent(d: Test): number {
      return +d.percentage;
    }

    private getClassAverage(d: Test): number {
        return +d.classAverage;
    }

    private getSchoolAverage(d: Test): number {
        return +d.schoolAverage;
    }

    private initSvg() {
    	this.svg = d3.select("svg#line-graph")
 			.append("g")
         	.attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");
 	}

 	private initAxis() {
		this.x = d3.scaleTime().range([0, this.width]);
		this.y = d3.scaleLinear().range([this.height, 0]);
		this.x.domain(d3.extent(this.testData, this.convertDate));
		this.y.domain(d3.extent([0,100]));
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
      // Draw student test results
	this.line = d3.line()
		.x( (d: any) => { 
			return this.x(this.convertDate(d));
		})
		.y( (d: any) => { 
			return this.y(this.convertPercent(d));
		});

    this.svg.append("path")
        .datum(this.testData)
        .attr("class", "line")
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 3)
        .attr("d", this.line);

    this.svg.append("text")
        .attr("transform", "translate(" + (3) + "," + this.y + ")")
        .attr("x", 700)
        .attr("dy", ".35em")
        .attr("text-anchor", "start")
        .style("fill", "steelblue")
        .text("Student Scores");

      // Draw class average results
    this.line = d3.line()
        .x((d: any) => {
            return this.x(this.convertDate(d));
        })
        .y((d: any) => {
            return this.y(this.getClassAverage(d));
        });

    this.svg.append("path")
        .datum(this.testData)
        .attr("class", "line")
        .attr("fill", "none")
        .attr("stroke", "orange")
        .attr("stroke-width", 3)
        .attr("d", this.line);

    this.svg.append("text")
        .attr("transform", "translate(" + (3) + "," + this.y + ")")
        .attr("x", 700)
        .attr("y", 15)
        .attr("dy", ".35em")
        .attr("text-anchor", "start")
        .style("fill", "orange")
        .text("Class Averages");

      // Draw school average results
    this.line = d3.line()
        .x((d: any) => {
            return this.x(this.convertDate(d));
        })
        .y((d: any) => {
            return this.y(this.getSchoolAverage(d));
        });

    this.svg.append("path")
        .datum(this.testData)
        .attr("class", "line")
        .attr("fill", "none")
        .attr("stroke", "black")
        .attr("stroke-width", 3)
        .attr("d", this.line);

    this.svg.append("text")
        .attr("transform", "translate(" + (3) + "," + this.y + ")")
        .attr("x", 700)
        .attr("y", 30)
        .attr("dy", ".35em")
        .attr("text-anchor", "start")
        .style("fill", "black")
        .text("School Averages");
  }

  private resetGraph() {
  	this.svg.selectAll("g.axis").remove();
  	this.svg.selectAll("path").remove();
  }
}