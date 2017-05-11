import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { AppComponent }  from './app.component';
import { RouterModule } from "@angular/router";
import { TeacherComponent } from './teachers.component';
import { StudentComponent } from './student.component';
import { GraphComponent} from './graph.component';
import { StudentService} from './student.service';

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        RouterModule.forRoot([ //route configuration
            { path: 'teachers', component: TeacherComponent },
            { path: 'students/:id', component: StudentComponent },
            { path: 'graph/:id', component: GraphComponent },
            { path: '', redirectTo: '/teachers', pathMatch: 'full' } //set teacher path as default
        ])
    ],
    declarations: [AppComponent, TeacherComponent, StudentComponent, GraphComponent],
    providers: [StudentService],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
