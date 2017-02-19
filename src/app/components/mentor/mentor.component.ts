import { Component, trigger, state, style, transition, animate } from '@angular/core';
import { MdDialog, MdDialogConfig, MdDialogRef } from '@angular/material';

import { StaffService } from "../../services/staff.service";
import { SkillService } from "../../services/skill.service";

import { Staff } from '../../entities/staff';


@Component({
  selector: 'mentor',
  templateUrl: 'mentor.component.html',
  styleUrls: ['mentor.component.css'],
  animations: [
    trigger('flyInOut', [
      state('in', style({transform: 'translateX(0)'})),
      transition('void => *', [
        style({transform: 'translateX(-100%)'}),
        animate(200)
      ]),
      transition('* => void', [
        animate(200, style({transform: 'translateX(100%)'}))
      ])
    ])
  ]
})
export class MentorComponent {

  constructor(private staffService: StaffService, private skillService: SkillService, private dialog: MdDialog) {
    console.log('initializing mentor constructor')
  }

  selectedSkill: string;
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

      newSkill = "";
    }
  }

  removeMentorSkill(skill: string) {
    console.log('deleting mentor skill: ' + skill);
    this.staffService.currentStaff.mentorSkills = this.staffService.currentStaff.mentorSkills.filter(mentorskill => mentorskill != skill)
  }

  retrieveMentees(skill: string): void {
    let config = new MdDialogConfig();
    this.dialogRef = this.dialog.open(MentorDialog, config);
    this.dialogRef.componentInstance.mentees = this.staffService.allStaff;
    this.dialogRef.componentInstance.skill = skill;
  }
}

@Component({
  template: `
    <h1 md-dialog-title>Overview of all mentees</h1>
    <div [ngSwitch]="(mentees | staffFilter: skill:role).length">
      <div *ngSwitchCase="0">Oops, no mentees so far...</div>
      <div *ngSwitchDefault>
        <md-list *ngFor="let mentee of (mentees | staffFilter: skill:role)">
          <md-list-item>{{mentee.name}}</md-list-item>
        </md-list>
      </div>
    </div>
  `,
})
export class MentorDialog {
  mentees: Staff[];
  skill: string;
  role = 'mentee';

  constructor(public dialogRef: MdDialogRef<MentorDialog>) { }
}
