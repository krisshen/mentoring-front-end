import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MdSnackBar, MdSnackBarConfig } from '@angular/material';

import { LoginService } from '../../services/login.service';
import { StaffService } from "../../services/staff.service";
import { SkillService } from "../../services/skill.service";


@Component({
  selector: 'mentoring',
  templateUrl: 'mentoring.component.html',
  styleUrls: ['mentoring.component.css']
})
export class MentoringComponent implements OnInit {

  constructor(private router: Router, private snackBar: MdSnackBar, private loginService: LoginService, private staffService: StaffService, private skillService: SkillService) {
    console.log('initializing mentoring constructor')
  }

  isloggedIn: boolean;
  isAdmin: boolean;
  staffID: string;
  initialMentorSkills: string[];
  initialMenteeSkills: string[];

  ngOnInit() {
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
          data => (this.staffService.currentStaff = data,
            this.initialMentorSkills = data.mentorSkills.slice(),
            this.initialMenteeSkills = data.menteeSkills.slice()),
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
      this.staffService.getAllStaff()
        .subscribe(
          data => this.staffService.allStaff = data,
          error => alert(error),
          () => (this.staffService.allStaffLoaded = true,
            console.log('Get All Staff Complete!'))
        );
    }
  }

  gotoAdmin() {
    this.router.navigate(['/admin']);
  }

  updateStaffSkills(): void {
    let sortedInitialMentorSkills = this.initialMentorSkills.sort();
    let sortedCurrentMentorSkills = this.staffService.currentStaff.mentorSkills.sort();
    let sortedInitialMenteeSkills = this.initialMenteeSkills.sort();
    let sortedCurrentMenteeSkills = this.staffService.currentStaff.menteeSkills.sort();

    if (((sortedInitialMentorSkills.length == sortedCurrentMentorSkills.length) && (sortedInitialMentorSkills.every((v, i) => v === sortedCurrentMentorSkills[i]))) && ((sortedInitialMenteeSkills.length == sortedCurrentMenteeSkills.length) && (sortedInitialMenteeSkills.every((v, i) => v === sortedCurrentMenteeSkills[i])))) {
      this.openSnackBar(false)
    } else {
      this.staffService.putStaffSkillsChange(this.staffService.currentStaff, this.staffID)
        .subscribe(
          data => console.log(data),
          error => alert(error),
          () => (this.openSnackBar(true),
            this.initialMentorSkills = this.staffService.currentStaff.mentorSkills.slice(),
            this.initialMenteeSkills = this.staffService.currentStaff.menteeSkills.slice(),
            console.log('Update Staff Skills'))
        )
    }
  }

  openSnackBar(updated: boolean) {
    let config = new MdSnackBarConfig();
    config.duration = 1500;

    if (updated == true) {
      this.snackBar.open("Skills have updated!", '', config);
    } else {
      this.snackBar.open("No skills updated!", '', config);
    }
  }
}
