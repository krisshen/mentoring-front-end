import {Component, OnInit, Optional} from '@angular/core';
import {SkillService} from '../../services/skill.service';
import {StaffService} from '../../services/staff.service';
import {Skill} from '../../entities/skill';
import {Staff} from '../../entities/staff';
import {LoginService} from "../../services/login.service";
import {MdDialog, MdDialogRef} from '@angular/material';

@Component({
  moduleId: module.id,
  selector: 'mentee',
  templateUrl: 'mentee.component.html',
  styleUrls: ['mentee.component.css']
})
export class MenteeComponent implements OnInit {

  constructor(private loginService: LoginService, private skillService: SkillService, private staffService: StaffService, private _dialog: MdDialog) {
    console.log('initializing mentee constructor')
  }

  // skills = ['Concordion', 'Cucumber', 'Selenium', 'C++', 'Scrum Master', 'ISTQB'];
  selectedSkill: Skill;
  allSkills: Skill[];
  allSkillsNames = [];
  currentStaff: Staff;
  lastDialogResult: string;

  addMenteeSkill(newSkill: string) {

    newSkill = newSkill.trim().toLowerCase()

    if (newSkill != '' && !this.currentStaff.menteeSkills.find(skill => skill.name.toLowerCase() === newSkill)) {

      //get skill info from all skills
      this.selectedSkill = this.skillService.getSelectedSkill(newSkill)

      if (this.selectedSkill == null) {
        console.log('this skill is not in the all-skill list')
      } else {
        console.log('in all-skill list')
        //and update this skill to current mentor
        this.currentStaff.menteeSkills.push(this.selectedSkill);
      }

      //and get the latest all-skill list
      this.getAllSkillsNames()
      newSkill = ""
    }
  }

  getAllSkillsNames(): void {
    for (let skill of this.allSkills) {
      // this.allSkillsNames.push(skill.name)
      // console.log(skill.name)
      this.allSkillsNames.push(skill.name)
    }
  }

  getAllSkills(): void {
    this.allSkills = this.skillService.getAllSkills()
  }

  getCurrentStaff(): void {
    console.log('mentee.getCurrentStaff')
    // this.currentStaff = this.staffService.getStaff(this.loginService.userID)
    this.currentStaff = this.staffService.currentStaff
  }

  delete(skill: string) {
    // this.currentStaff.mentorSkills = [{name: 'test'}, {name: 'autotest'}]
    console.log('deleting skill: ' + skill);
    this.currentStaff.menteeSkills = this.currentStaff.menteeSkills.filter(menteeskill => menteeskill.name != skill)
  }

  ngOnInit(): void {
    this.getAllSkills();
    this.getAllSkillsNames();
    this.getCurrentStaff();
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
