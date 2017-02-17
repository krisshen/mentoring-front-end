import { Component } from '@angular/core';

import { MdDialog, MdDialogConfig, MdDialogRef } from '@angular/material';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';

import { StaffService } from "../../services/staff.service";
import { SkillService } from "../../services/skill.service";
import { MatchService } from "../../services/match.service";

import { Staff } from '../../entities/staff';
import { Match } from "../../entities/match";


@Component({
  selector: 'mentee',
  templateUrl: 'mentee.component.html',
  styleUrls: ['mentee.component.css']
})
export class MenteeComponent {

  constructor(private dialog: MdDialog, private staffService: StaffService, private skillService: SkillService) {
    console.log('initializing mentee constructor')
  }

  selectedSkill: string;
  selectedMentor: string;
  dialogRef:MdDialogRef<MenteeDialog>;

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
        console.log('in all-skill list');
        this.staffService.currentStaff.menteeSkills.push(this.selectedSkill);
      }

      newSkill = ""
    }
  }

  removeMenteeSkill(skill: string) {
    console.log('deleting mentee skill: ' + skill);
    this.staffService.currentStaff.menteeSkills = this.staffService.currentStaff.menteeSkills.filter(menteeskill => menteeskill != skill)
  }

  retrieveMentors(skill: string): void {
    let config = new MdDialogConfig();
    this.dialogRef = this.dialog.open(MenteeDialog, config);
    this.dialogRef.componentInstance.mentors = this.staffService.allStaff;
    this.dialogRef.componentInstance.mentee = this.getCurrentStaff().name;
    this.dialogRef.componentInstance.skill = skill;
  }
}

@Component({
  template: `
    <h1 md-dialog-title>Overview of all mentors</h1>
    <div [ngSwitch]="(mentors | staffFilter: skill:role).length">
      <div *ngSwitchCase="0">Oops, no mentors so far...</div>
      <div *ngSwitchDefault>
        <md-select placeholder="Mentor" [(ngModel)]="selectedMentor" name="mentor">
          <md-option *ngFor="let mentor of (mentors | staffFilter: skill:role)" [value]="mentor.name">
            {{mentor.name}}
          </md-option>
        </md-select>
        <p> Selected Mentor: {{selectedMentor}} </p>
        <button md-mini-fab (click)="save(selectedMentor)"><md-icon>check</md-icon></button>
      </div>
    </div>
  `,
})
export class MenteeDialog {
  mentors: Staff[];
  mentee: string;
  skill: string;
  role: 'mentor';

  constructor(public dialogRef: MdDialogRef<MenteeDialog>, private matchService: MatchService, private snackBar: MdSnackBar) { }

  save(mentor: string): void {
    this.matchService.putMatch(new Match({'mentor': mentor, 'mentee': this.mentee, 'skill': this.skill}))
      .subscribe(
        data => console.log(data),
        error => alert(error),
        () => (this.openSnackBar(),
          this.dialogRef.close())
      );
  }

  openSnackBar() {
    let config = new MdSnackBarConfig();
    config.duration = 1500;
    this.snackBar.open("Mentor selected!", '', config);
  }
}
