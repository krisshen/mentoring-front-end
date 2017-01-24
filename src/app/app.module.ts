import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './routing/app-routing.module'

import { AppComponent } from './app.component';
import { MaterialModule } from '@angular/material';
import { SkillService } from "./services/skill.service";
import { StaffService } from "./services/staff.service";
import { Ng2AutoCompleteModule } from 'ng2-auto-complete';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MenteeComponent } from './components/mentee/mentee.component';
import { MentorComponent } from './components/mentor/mentor.component';
import { MentoringComponent } from './components/mentoring/mentoring.component';
import { PlaceHolderComponent} from './components/placeholder/placeholder.component';
import { LoginService} from "./services/login.service";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    MenteeComponent,
    MentorComponent,
    MentoringComponent,
    PlaceHolderComponent
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
