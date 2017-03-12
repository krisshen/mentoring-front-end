import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {AppRoutingModule} from './routing/app-routing.module'

import {AppComponent} from './app.component';
import {MaterialModule} from '@angular/material';
import {SkillService} from "./services/skill.service";
import {StaffService} from "./services/staff.service";
import {HomeComponent} from './components/home/home.component';
import {LoginComponent} from './components/login/login.component';
import {MenteeComponent, MenteeDialog} from './components/mentee/mentee.component';
import {MentorComponent, MentorDialog} from './components/mentor/mentor.component';
import {MentoringComponent} from './components/mentoring/mentoring.component';
import {LoginService} from "./services/login.service";
import {HttpService} from "./services/http.service";
import {AdminComponent} from './components/admin/admin.component';
import {CategoryService} from "./services/category.service";
import { CategorydialogComponent } from './components/categorydialog/categorydialog.component';
import { StaffFilterPipe } from './pipes/staff-filter.pipe';
import { MatchService } from './services/match.service';
import { MatchFilterPipe } from './pipes/match-filter.pipe';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    MenteeComponent,
    MenteeDialog,
    MentorComponent,
    MentorDialog,
    MentoringComponent,
    AdminComponent,
    CategorydialogComponent,
    StaffFilterPipe,
    MatchFilterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
    MaterialModule,
    NgxDatatableModule
  ],
  entryComponents: [
    MentorDialog,
    MenteeDialog,
    CategorydialogComponent
  ],
  providers: [CategoryService, SkillService, StaffService, LoginService, HttpService, MatchService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
