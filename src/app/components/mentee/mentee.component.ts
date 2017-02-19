import { Component, trigger, state, style, transition, animate } from '@angular/core';

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
  styleUrls: ['mentee.component.css'],
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
export class MenteeComponent {

  constructor(private dialog: MdDialog, private staffService: StaffService, private skillService: SkillService, private matchService: MatchService, private snackBar: MdSnackBar) {
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

    for (let item of this.matchService.allMatch) {
      if (skill == item.skill) {
        this.matchService.deleteMatch(item.mentor, item.mentee, skill)
          .subscribe(
            data => (console.log(data),
              this.openSnackBar()),
            error => alert(error),
            () => (console.log('Delete match status: ' + skill),
              this.matchService.isSubmitted == true)
          )
      }
    }

    this.staffService.currentStaff.menteeSkills = this.staffService.currentStaff.menteeSkills.filter(menteeskill => menteeskill != skill);
  }

  retrieveMentors(skill: string): void {
    let config = new MdDialogConfig();
    this.dialogRef = this.dialog.open(MenteeDialog, config);
    this.dialogRef.componentInstance.mentors = this.staffService.allStaff;
    this.dialogRef.componentInstance.matches = this.matchService.allMatch;
    this.dialogRef.componentInstance.mentee = this.getCurrentStaff().name;
    this.dialogRef.componentInstance.skill = skill;
  }

  openSnackBar() {
    let config = new MdSnackBarConfig();
    config.duration = 1500;
    this.snackBar.open("Match deleted!", '', config);
  }
}

@Component({
  template: `
    <h1 md-dialog-title>Overview of all mentors</h1>
    <div [ngSwitch]="(mentors | staffFilter: skill:role).length">
      <div *ngSwitchCase="0">Oops, no mentors so far...</div>
      <div *ngSwitchDefault>
        <div [ngSwitch]="matchService.isMatching">
          <div *ngSwitchCase="true">
            <md-spinner></md-spinner>
          </div>
          <div *ngSwitchDefault>
            <md-select placeholder="Mentor" [(ngModel)]="selectedMentor" name="mentor">
              <md-option *ngFor="let mentor of (mentors | staffFilter: skill:role)" [value]="mentor.name">{{mentor.name}}</md-option>
            </md-select>
            <p> Selected Mentor: {{selectedMentor}} </p>
            <button md-mini-fab (click)="save(selectedMentor)"><md-icon>check</md-icon></button>
            <div [ngSwitch]="matchService.isSubmitted">
              <div *ngSwitchCase="true">
                Refresh to view the update
              </div>
              <div *ngSwitchDefault>
                <div *ngIf="(matches | matchFilter: skill).length > 0">
                  <p *ngFor="let match of (matches | matchFilter: skill)">
                    Your current mentor is: {{match.mentor}}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class MenteeDialog {
  mentors: Staff[];
  matches: Match[];
  mentee: string;
  skill: string;
  role: 'mentor';

  constructor(public dialogRef: MdDialogRef<MenteeDialog>, private matchService: MatchService, private snackBar: MdSnackBar) { }

  save(mentor: string): void {
    if (!mentor) {
      this.openSnackBar('noValue')
    } else if (mentor == this.mentee) {
      this.openSnackBar('selfValue')
    } else if (mentor == this.retrieveMatchMentor(this.matches, this.skill)) {
      this.openSnackBar('sameValue')
    } else {
      this.matchService.isMatching = true;
      this.matchService.putMatch(new Match({'mentor': mentor, 'mentee': this.mentee, 'skill': this.skill}))
        .subscribe(
          data => console.log(data),
          error => alert(error),
          () => (this.matchService.isMatching = false,
            this.matchService.isSubmitted = true,
            this.openSnackBar('success'),
            this.dialogRef.close())
        );
    }
  }

  retrieveMatchMentor(matches: Match[], skill: string): string {
    for (let match of matches) {
      if (match.skill == skill) {
        return match.mentor
      }
    }
  }

  openSnackBar(situation: string) {
    let config = new MdSnackBarConfig();
    config.duration = 1500;

    if (situation == 'noValue') {
      this.snackBar.open("Please select your mentor firstly!", '', config);
    } else if (situation == 'selfValue') {
      this.snackBar.open("Cannot select yourself!", '', config);
    } else if (situation == 'sameValue') {
      this.snackBar.open("Same mentor as now!", '', config);
    } else {
      this.snackBar.open("Mentor selected!", '', config);
    }
  }
}
