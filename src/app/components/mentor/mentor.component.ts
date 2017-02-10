import { Component, OnInit, Optional } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';

import { StaffService } from "../../services/staff.service";
import { SkillService } from "../../services/skill.service";

import { Staff } from '../../entities/staff';


@Component({
  selector: 'mentor',
  templateUrl: 'mentor.component.html',
  styleUrls: ['mentor.component.css']
})
export class MentorComponent implements OnInit {

  constructor(private skillService: SkillService, private staffService: StaffService, private _dialog: MdDialog) {
    console.log('initializing mentor constructor')
  }

  selectedSkill: string;
  allSkillsNames = [];
  lastDialogResult: string;

  getCurrentStaff(): Staff {
    return this.staffService.currentStaff
  }

  addMentorSkill(newSkill: string) {
    newSkill = newSkill.trim();

    // If new skill not equals to '' and
    // new skill not already in the mentor skill list and
    // new skill is in the list of all skills, then...
    if (newSkill != '' && !this.staffService.currentStaff.mentorSkills.find(skill => skill === newSkill) && this.skillService.allSkillsName.find(skill => skill === newSkill)) {

      this.selectedSkill = newSkill;

      if (this.selectedSkill == null) {
        console.log('this skill is not in the all-skill list')
      } else {
        console.log('in all-skill list');
        this.staffService.currentStaff.mentorSkills.push(this.selectedSkill);
      }

      newSkill = ""
    }
  }

  removeMentorSkill(skill: string) {
    console.log('deleting mentor skill: ' + skill);
    this.staffService.currentStaff.mentorSkills = this.staffService.currentStaff.mentorSkills.filter(mentorskill => mentorskill != skill)
  }

  ngOnInit(): void {
  }

  openDialog() {
    let dialogRef = this._dialog.open(MentorDialog);

    dialogRef.afterClosed().subscribe(result => {
      this.lastDialogResult = result;
    })
  }
}

@Component({
  template: `
    <h1 md-dialog-title>Overview of the mentee</h1>
    <md-list *ngFor="let mentee of mentees">
      <md-list-item>{{mentee.viewValue}}</md-list-item>
    </md-list>
  `,
})
export class MentorDialog {
  constructor(@Optional() public dialogRef: MdDialogRef<MentorDialog>) {
  }

  mentees = [
    {value: 'Di', viewValue: 'Di Zhang'},
    {value: 'Yang', viewValue: 'Yang Shen'},
    {value: 'Cillin', viewValue: 'Cillin Hearns'},
    {value: 'Daniel', viewValue: 'Daniel Kate'},
    {value: 'Alex', viewValue: 'Alex Alexis'},
    {value: 'Jad', viewValue: 'Jad Jeff'}
  ];
}
