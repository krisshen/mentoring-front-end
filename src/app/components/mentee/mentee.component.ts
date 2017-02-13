import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';

import { StaffService } from "../../services/staff.service";
import { SkillService } from "../../services/skill.service";

import { Staff } from '../../entities/staff';


@Component({
  selector: 'mentee',
  templateUrl: 'mentee.component.html',
  styleUrls: ['mentee.component.css']
})
export class MenteeComponent implements OnInit {

  constructor(private staffService: StaffService, private skillService: SkillService, private _dialog: MdDialog) {
    console.log('initializing mentee constructor')
  }

  selectedSkill: string;
  allSkillsNames = [];
  lastDialogResult: string;

  getCurrentStaff(): Staff {
    return this.staffService.currentStaff
  }

  addMenteeSkill(newSkill: string) {
    newSkill = newSkill.trim();

    // If new skill not equals to '' and
    // new skill not already in the mentor skill list and
    // new skill is in the list of all skills, then...
    if (newSkill != '' && !this.staffService.currentStaff.menteeSkills.find(skill => skill === newSkill) && this.skillService.allSkillsName.find(skill => skill === newSkill)) {

      this.selectedSkill = newSkill;

      if (this.selectedSkill == null) {
        console.log('this skill is not in the all-skill list')
      } else {
        console.log('in all-skill list')
        this.staffService.currentStaff.menteeSkills.push(this.selectedSkill);
      }

      newSkill = ""
    }
  }

  removeMenteeSkill(skill: string) {
    console.log('deleting mentee skill: ' + skill);
    this.staffService.currentStaff.menteeSkills = this.staffService.currentStaff.menteeSkills.filter(menteeskill => menteeskill != skill)
  }

  ngOnInit(): void {
  }

  openDialog() {
    let dialogRef = this._dialog.open(MenteeDialog);

    dialogRef.afterClosed().subscribe(result => {
      this.lastDialogResult = result;
    })
  }
}

@Component({
  template: `
    <h1 md-dialog-title>Select Your Mentor</h1>
    <md-select placeholder="Mentor" [(ngModel)]="selectedMentor" name="mentor">
      <md-option *ngFor="let mentor of mentors" [value]="mentor.value">
       {{mentor.viewValue}}
      </md-option>
    </md-select>
    <p> Mentor: {{selectedMentor}} </p>
    <button md-mini-fab (click)="dialogRef.close(selectedMentor)"><md-icon>check</md-icon></button>
  `,
})
export class MenteeDialog {
  constructor(public dialogRef: MdDialogRef<MenteeDialog>) {}

  selectedMentor: string;

  mentors = [
    {value: 'Di', viewValue: 'Di Zhang'},
    {value: 'Yang', viewValue: 'Yang Shen'},
    {value: 'Cillin', viewValue: 'Cillin Hearns'},
    {value: 'Daniel', viewValue: 'Daniel Kate'},
    {value: 'Alex', viewValue: 'Alex Alexis'},
    {value: 'Jad', viewValue: 'Jad Jeff'}
  ];
}
