import { Component } from '@angular/core';

@Component({
    selector: 'my-app',
    template: `
        <h1>{{title}}</h1>
       <router-outlet></router-outlet>
      `
})
export class AppComponent {
    title = 'College Place High School'; //todo: replace with the school name obtained from school district CSV file
}