import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MdSnackBar, MdSnackBarConfig } from '@angular/material';

import { LoginService } from '../../services/login.service';
import { StaffService } from "../../services/staff.service";
import { SkillService } from "../../services/skill.service";
import { MatchService } from "../../services/match.service";

import { Staff } from '../../entities/staff';


@Component({
  selector: 'mentoring',
  templateUrl: 'mentoring.component.html',
  styleUrls: ['mentoring.component.css']
})
export class MentoringComponent implements OnInit {

  constructor(private router: Router, private snackBar: MdSnackBar, private loginService: LoginService, private staffService: StaffService, private skillService: SkillService, private matchService: MatchService) {
    console.log('initializing mentoring constructor')
  }

  isloggedIn: boolean;
  isAdmin: boolean;
  isSubmitting: boolean;
  staffID: string;
  initialMentorSkills: string[];
  initialMenteeSkills: string[];
  newStaff: Staff;

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
            console.log(this.staffService.currentStaff),
            this.initialMentorSkills = data.mentorSkills.slice(),
            this.initialMenteeSkills = data.menteeSkills.slice()),
          error => (console.log('****************' + error),
            this.upsertNewStaff(error)),
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
      this.matchService.getAllMatch(this.loginService.userName)
        .subscribe(
          data => (this.matchService.allMatch = data,
            this.matchService.matchAmount = data.length),
          error => alert(error),
          () => (console.log('Get All Match Complete!'))
        );
    }
  }

  gotoAdmin() {
    this.router.navigate(['/admin']);
  }

  upsertNewStaff(error: any): void {
    if (error.status = 500) {
      this.newStaff = new Staff({'id': this.staffID, 'name': this.loginService.userName, 'email': this.loginService.userEmail, 'mentorSkills': [], 'menteeSkills': []});

      this.staffService.putNewUser(this.newStaff, this.staffID)
        .subscribe(
          data => console.log(data),
          error => alert(error),
          () => (
            this.staffService.currentStaff = this.newStaff,
            this.initialMentorSkills = this.staffService.currentStaff.mentorSkills.slice(),
            this.initialMenteeSkills = this.staffService.currentStaff.menteeSkills.slice(),
            this.openSnackBar('staff', true),
            this.staffService.isStaffLoaded = true)
        );
    } else {
      alert('Oops... something went wrong!!!')
    }
  }

  updateStaffSkills(): void {
    let sortedInitialMentorSkills = this.initialMentorSkills.sort();
    let sortedCurrentMentorSkills = this.staffService.currentStaff.mentorSkills.sort();
    let sortedInitialMenteeSkills = this.initialMenteeSkills.sort();
    let sortedCurrentMenteeSkills = this.staffService.currentStaff.menteeSkills.sort();

    if (((sortedInitialMentorSkills.length == sortedCurrentMentorSkills.length) && (sortedInitialMentorSkills.every((v, i) => v === sortedCurrentMentorSkills[i]))) && ((sortedInitialMenteeSkills.length == sortedCurrentMenteeSkills.length) && (sortedInitialMenteeSkills.every((v, i) => v === sortedCurrentMenteeSkills[i])))) {
      this.openSnackBar('skill', false)
    } else {
      this.isSubmitting = true;
      this.staffService.putStaffSkillsChange(this.staffService.currentStaff, this.staffID)
        .subscribe(
          data => console.log(data),
          error => alert(error),
          () => (this.openSnackBar('skill', true),
            this.initialMentorSkills = this.staffService.currentStaff.mentorSkills.slice(),
            this.initialMenteeSkills = this.staffService.currentStaff.menteeSkills.slice(),
            this.isSubmitting = false,
            console.log('Update Staff Skills'))
        )
    }
  }

  openSnackBar(type: string, updated: boolean) {
    let config = new MdSnackBarConfig();
    config.duration = 1500;

    if (type == 'skill') {
      if (updated == true) {
        this.snackBar.open("Skills have updated!", '', config);
      } else {
        this.snackBar.open("No skills updated!", '', config);
      }
    } else {
      this.snackBar.open("Welcome to user the Mentoring App!", '', config);
    }
  }
}
