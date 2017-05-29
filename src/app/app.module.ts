import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { TeacherComponent } from './teachers.component';
import { StudentComponent } from './student.component';
import { GraphComponent} from './graph.component';
import { StudentService} from './student.service';
import { LineGraphComponent } from './line-graph.component';

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule,
        RouterModule.forRoot([ // Route configuration
            { path: 'teachers', component: TeacherComponent },
            { path: 'students/:id', component: StudentComponent },
            { path: 'graph/:id', component: GraphComponent },
            { path: '', redirectTo: '/teachers', pathMatch: 'full' } // Set teacher path as default
        ])
    ],
    declarations: [AppComponent, TeacherComponent, StudentComponent, GraphComponent, LineGraphComponent],
    providers: [StudentService],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
