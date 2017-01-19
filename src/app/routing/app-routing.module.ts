import { MenteeComponent } from '../components/mentee/mentee.component'
import { MentorComponent } from '../components/mentor/mentor.component'
import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: 'iammentor',  component: MentorComponent },
  { path: 'iammentee', component: MenteeComponent },
]

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  providers: []
})
export class AppRoutingModule {}
