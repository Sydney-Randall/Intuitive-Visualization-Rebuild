/*
The "base" page. Used to display the title of the school and route to the appropriate component.
Title of school could be obtained in a similar way as the rest of the data and dynamically changed to whatever school the teacher is in.
 */

import { Component } from '@angular/core';

@Component({
    selector: 'my-app',
    template: `
        <h1>{{title}}</h1>
       <router-outlet></router-outlet>
      `
})
export class AppComponent {
    title = 'College Place High School';
}
