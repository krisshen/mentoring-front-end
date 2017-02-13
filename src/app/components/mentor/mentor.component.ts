import { Component } from '@angular/core';
import { MdDialog, MdDialogConfig, MdDialogRef } from '@angular/material';

import { StaffService } from "../../services/staff.service";
import { SkillService } from "../../services/skill.service";

import { Staff } from '../../entities/staff';


@Component({
  selector: 'mentor',
  templateUrl: 'mentor.component.html',
  styleUrls: ['mentor.component.css']
})
export class MentorComponent {

  constructor(private skillService: SkillService, private staffService: StaffService, private dialog: MdDialog) {
    console.log('initializing mentor constructor')
  }

  selectedSkill: string;
  menteeList: Staff[];
  dialogRef:MdDialogRef<MentorDialog>;

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

  retrieveMentees(skill: string): void {
    this.staffService.getMenteeList(skill, this.getCurrentStaff().id)
      .subscribe(
        data => this.menteeList = data,
        error => alert(error),
        () => (this.staffService.isMenteeLoaded = true,
            console.log('Retrieve mentee list'))
      );

    let config = new MdDialogConfig();
    this.dialogRef = this.dialog.open(MentorDialog, config);
    this.dialogRef.componentInstance.mentees = this.menteeList;
  }
}

@Component({
  template: `
    <h1 md-dialog-title>Overview of the mentee</h1>
    <div *ngIf="!staffService.isMenteeLoaded">
      <md-spinner></md-spinner>
    </div>
    <div *ngIf="staffService.isMenteeLoaded">
      <md-list *ngFor="let mentee of mentees">
        <md-list-item>{{mentee.name}}</md-list-item>
      </md-list>
    </div>
  `,
})
export class MentorDialog {
  mentees: Staff[];
  constructor(private staffService: StaffService, public dialogRef: MdDialogRef<MentorDialog>) { }
}
