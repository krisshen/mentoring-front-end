import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './routing/app-routing.module'

import { AppComponent } from './app.component';
import { MenteeComponent } from './components/mentee/mentee.component'
import { MentorComponent } from './components/mentor/mentor.component'
import { PlaceHolderComponent} from './components/placeholder/placeholder.component'
import { MaterialModule } from '@angular/material';
import {SkillService} from "./services/skill.service";
import {StaffService} from "./services/staff.service";
import { Ng2AutoCompleteModule } from 'ng2-auto-complete';
import {LoginComponent} from './components/login/login.component';
import { MentoringComponent } from './components/mentoring/mentoring.component';
import {LoginService} from "./services/login.service";

@NgModule({
  declarations: [
    AppComponent,
    MenteeComponent,
    MentorComponent,
    PlaceHolderComponent,
    LoginComponent,
    MentoringComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    MaterialModule.forRoot(),
    Ng2AutoCompleteModule
  ],
  providers: [SkillService, StaffService, LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
