import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from '../../services/login.service';
import { StaffService } from "../../services/staff.service";
import { SkillService } from "../../services/skill.service";


@Component({
  selector: 'mentoring',
  templateUrl: 'mentoring.component.html',
  styleUrls: ['mentoring.component.css']
})
export class MentoringComponent implements OnInit {

  constructor(private staffService: StaffService, private router: Router, private loginService: LoginService, private skillService: SkillService) {
    console.log('initializing mentoring constructor')
  }

  backgroundPhotoUrl: string;
  isloggedIn: boolean;
  isAdmin: boolean;
  staffID: string;

  ngOnInit() {
    this.backgroundPhotoUrl = 'http://gencept.com/wp-content/uploads/2016/04/Wallpaper-of-the-Week-25-Material-Design-Inspired-Wallpapers_24-@-GenCept.png';
    this.isloggedIn = this.loginService.isLoggedIn();
    this.isAdmin = this.loginService.isAdmin();

    if (!this.isloggedIn) {
      console.log('mentoring.OnInit... user not logged in');
      this.router.navigate(['/'])
    }
    else {
      console.log('mentoring.OnInit... user logged in');
      this.staffID = this.loginService.userName.replace(' ', '').toLowerCase().trim();
      console.log('mentoring.OnInit... staff ID is: ' + this.staffID);
      this.staffService.getStaff(this.staffID)
        .subscribe(
          data => this.staffService.currentStaff = data,
          error => alert(error),
          () => (this.staffService.isStaffLoaded = true,
            console.log('Get Request Complete!'))
        );
      this.skillService.getAllSkills()
        .subscribe(
          data => this.skillService.allSkills = data,
          error => alert(error),
          () => (this.skillService.getAllSkillsName(),
            console.log('Get All SKills Complete!'))
        );
    }
  }

  gotoAdmin() {
    this.router.navigate(['/admin']);
  }

  updateStaffSkills(): void {
    this.staffService.putStaffSkillsChange(this.staffService.currentStaff, this.staffID)
      .subscribe(
        data => console.log(data),
        error => alert(error),
        () => (console.log('Update Staff Skills'))
      )
  }
}
