"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var tests_1 = require('./tests');
var student_service_1 = require('./student.service');
var router_1 = require('@angular/router');
var d3 = require('d3');
// Add graphing here
var GraphComponent = (function () {
    function GraphComponent(route, router, service) {
        var _this = this;
        this.route = route;
        this.router = router;
        this.service = service;
        this.tests = tests_1.StudentTESTS;
        this.margin = { top: 20, right: 20, bottom: 30, left: 50 };
        this.route.params.subscribe(function (params) {
            _this.id = params['id'];
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
    GraphComponent.prototype.ngOnInit = function () {
        this.currentStudent = this.service.getStudent(this.id);
        this.initSvg();
    };
    GraphComponent.prototype.ngOnChanges = function () {
    };
    GraphComponent.prototype.ngAfterViewChecked = function () {
        this.initAxis();
        this.drawAxis();
        this.drawLine();
    };
    GraphComponent.prototype.convertDate = function (d) {
        var parts = d.taken.split('/');
        var returnDate = new Date(+parts[2], +parts[0] - 1, +parts[1]);
        console.log(returnDate);
        return returnDate;
    };
    GraphComponent.prototype.convertPercent = function (d) {
        return +d.percentage;
    };
    GraphComponent.prototype.initSvg = function () {
        this.svg = d3.select("svg")
            .append("g")
            .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");
        ;
    };
    GraphComponent.prototype.initAxis = function () {
        this.x = d3.scaleTime().range([0, this.width]);
        this.y = d3.scaleLinear().range([this.height, 0]);
        this.x.domain(d3.extent(this.tests, this.convertDate));
        this.y.domain(d3.extent([0, 100]));
    };
    GraphComponent.prototype.drawAxis = function () {
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
    };
    GraphComponent.prototype.drawLine = function () {
        var _this = this;
        this.line = d3.line()
            .x(function (d) {
            return _this.x(_this.convertDate(d));
        })
            .y(function (d) {
            return _this.y(_this.convertPercent(d));
        });
        this.svg.append("path")
            .datum(this.tests)
            .attr("class", "line")
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("d", this.line);
    };
    __decorate([
        core_1.ViewChild('graphContainer'), 
        __metadata('design:type', core_1.ElementRef)
    ], GraphComponent.prototype, "graphContainer", void 0);
    GraphComponent = __decorate([
        core_1.Component({
            selector: 'my-graphs',
            templateUrl: 'app/graph.component.html',
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, router_1.Router, student_service_1.StudentService])
    ], GraphComponent);
    return GraphComponent;
}());
exports.GraphComponent = GraphComponent;
//# sourceMappingURL=graph.component.js.map