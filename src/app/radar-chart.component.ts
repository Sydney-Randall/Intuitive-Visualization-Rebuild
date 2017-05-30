/*
 * Adapted from http://bl.ocks.org/nbremer/6506614
 *
 */

import { Component, Input, OnInit, AfterViewChecked } from '@angular/core';
import { Test } from './tests';
import { RadarData } from './radar-data';
import { DataEntry } from './data-entry';
import * as d3 from 'd3';

@Component({
	selector: 'radar-chart',
	template: '<div id="radar-chart"></div>'
})

export class RadarChartComponent implements OnInit, AfterViewChecked {
	@Input() radarData: RadarData[];

	private radius = 5;
	private w = 600;
	private h = 600;
	private factor = 1;
	private factorLegend = .85;
	private levels = 10;
	private maxValue = 100;
	private radians = 2 * Math.PI;
	private opacityArea = 0.5;
	private ToRight = 5;
	private TranslateX = 80;
	private TranslateY = 30;
	private ExtraWidthX = 100;
	private ExtraWidthY = 100;
	private color:d3.ScaleOrdinal<any, any> = d3.scaleOrdinal(d3.schemeCategory10);

	private svg: any;
	private total: any;
	private radius2 = this.factor*Math.min(this.w/2, this.h/2);
	private Format: any = d3.format('%');
	private allAxis: any;
	private series : number;


	constructor() {

	}

	ngOnInit() {
		

	}

	ngAfterViewChecked() {
		this.resetChart();
		this.initSvg();
		this.drawChart();
	}

	private initSvg() {
		this.svg = d3.select('#radar-chart')
			.append("svg")
			.attr("width", this.w+this.ExtraWidthX)
			.attr("height", this.h+this.ExtraWidthY)
			.append("g")
			.attr("transform", "translate("+this.TranslateX + "," + this.TranslateY + ")");
	}

	private drawChart() {
		this.allAxis = (this.radarData[0].data.map( (i, j) => { return i.axis}));
		this.total = this.allAxis.length;

		//draw the lines axis lines that "ring" around the center
		for(let j=0; j<this.levels -1; j++){
			let levelFactor = this.factor*this.radius2*((j+1)/this.levels);
			this.svg.selectAll(".levels")
				.data(this.allAxis)
				.enter()
				.append("svg:line")
				.attr("x1", (d, i) => { return levelFactor*(1-this.factor*Math.sin(i*this.radians/this.total));})
				.attr("y1", (d, i) => { return levelFactor*(1-this.factor*Math.cos(i*this.radians/this.total));})
				.attr("x2", (d, i) => { return levelFactor*(1-this.factor*Math.sin((i+1)*this.radians/this.total));})
				.attr("y2", (d, i) => { return levelFactor*(1-this.factor*Math.cos((i+1)*this.radians/this.total));})
				.attr("class", "line")
				.style("stroke", "grey")
				.style("stroke-opacity","0.75")
				.style("stroke-width", "0.3px")
				.attr("transform", "translate(" + (this.w/2-levelFactor) + ", " + (this.h/2-levelFactor) + ")");
		}

		//draw the lines that "explode" from the center
		let axis = this.svg.selectAll(".axis")
			.data(this.allAxis)
			.enter()
			.append("g")
			.attr("class", "axis");

		axis.append("line")
			.attr("x1", this.w/2)
			.attr("y1", this.h/2)
			.attr("x2", (d, i) => { return this.w/2*(1-this.factor*Math.sin(i*this.radians/this.total));})
			.attr("y2", (d, i) => { return this.h/2*(1-this.factor*Math.cos(i*this.radians/this.total));})
			.attr("class", "line")
			.style("stroke", "grey")
			.style("stroke-width", "1px");


		//label each line with the name of the category
		axis.append("text")
			.attr("class", "legend")
			.text((d) => {return d})
			.style("font-family", "sans-serif")
			.style("font-size", "11px")
			.attr("text-anchor", "middle")
			.attr("dy", "1.5em")
			.attr("transform", (d, i) => {return "translate(0, -10)"})
			.attr("x", (d, i) => {return this.w/2*(1-this.factorLegend*Math.sin(i*this.radians/this.total))-60*Math.sin(i*this.radians/this.total);})
			.attr("y", (d, i) => {return this.h/2*(1-Math.cos(i*this.radians/this.total))-20*Math.cos(i*this.radians/this.total);});

		this.series=0;
		this.radarData.forEach((y, x) => {
			let dataValues = [];
			this.svg.selectAll(".nodes")
			.data(y.data, (j, i) => { 
				dataValues.push([
					this.w/2*(1-(Math.max(j.value,0)/this.maxValue)*this.factor*Math.sin(i*this.radians/this.total)),
					this.h/2*(1-(Math.max(j.value, 0)/this.maxValue)*this.factor*Math.cos(i*this.radians/this.total))
				]);
			});
			dataValues.push(dataValues[0]);
			this.svg.selectAll(".area")
				.data([dataValues])
				.enter()
				.append("polygon")
				.attr("class", "radar-chart-serie"+this.series)
				.style("stroke-width", "2px")
				.style("stroke", this.color(this.series))
				.attr("points", (d) =>{
					let str = "";
					for(let pti=0; pti <d.length; pti++){
						str=str+d[pti][0]+","+d[pti][1]+" ";
					}
					return str;
				})
				.style("fill", (j, i) => { return this.color(this.series)})
				.style("fill-opacity", this.opacityArea)
				.append("svg:title")
				.text((j) => { return Math.max(j.value,0)});
				this.series++;
		});
	}

	private resetChart() {
		d3.select("#radar-chart").select("svg").remove();
	}
}