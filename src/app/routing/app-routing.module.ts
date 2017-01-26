import { HomeComponent } from '../components/home/home.component';
import { MenteeComponent } from '../components/mentee/mentee.component';
import { MentorComponent } from '../components/mentor/mentor.component';
import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../components/login/login.component';
import { MentoringComponent } from '../components/mentoring/mentoring.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'mentoring', component: MentoringComponent },
  { path: 'iammentor', component: MentorComponent },
  { path: 'iammentee', component: MenteeComponent },
]

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  providers: []
})
export class AppRoutingModule {}
