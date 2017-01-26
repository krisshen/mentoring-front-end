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
import { MentorComponent, MentorDialog } from './components/mentor/mentor.component';
import { MentoringComponent } from './components/mentoring/mentoring.component';
import { PlaceHolderComponent, DialogContent } from './components/placeholder/placeholder.component';
import { LoginService} from "./services/login.service";
// import { DialogComponent } from './components/dialog/dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    MenteeComponent,
    MentorComponent,
    MentoringComponent,
    PlaceHolderComponent,
    DialogContent,
    MentorDialog
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    MaterialModule.forRoot(),
    Ng2AutoCompleteModule
  ],
  entryComponents: [
    PlaceHolderComponent,
    DialogContent,
    MentorDialog
  ],
  providers: [SkillService, StaffService, LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
