import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from '../components/home/home.component';
import { MenteeComponent } from '../components/mentee/mentee.component';
import { MentorComponent } from '../components/mentor/mentor.component';
import { MentoringComponent } from '../components/mentoring/mentoring.component';
import {AdminComponent} from "../components/admin/admin.component";


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'mentoring', component: MentoringComponent },
  { path: 'admin', component: AdminComponent },
  // { path: 'iammentor', component: MentorComponent },
  // { path: 'iammentee', component: MenteeComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  providers: []
})
export class AppRoutingModule {}
