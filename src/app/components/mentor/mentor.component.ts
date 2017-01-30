import {Component, OnInit, Optional} from '@angular/core';
import {SkillService} from '../../services/skill.service';
import {StaffService} from '../../services/staff.service';
import {LoginService} from '../../services/login.service';
import {Skill} from '../../entities/skill';
import {Staff} from '../../entities/staff';
import {MdDialog, MdDialogRef} from '@angular/material';

@Component({
  moduleId: module.id,
  selector: 'mentor',
  templateUrl: 'mentor.component.html',
  styleUrls: ['mentor.component.css']
})
export class MentorComponent implements OnInit {

  constructor(private loginService: LoginService, private skillService: SkillService, private staffService: StaffService, private _dialog: MdDialog) {
  }

  selectedSkill: Skill;
  currentStaff: Staff;
  lastDialogResult: string;

  addMentorSkill(newSkill: string) {

    newSkill = newSkill.trim().toLowerCase();

    if (newSkill != '' && !this.currentStaff.mentorSkills.find(skill => skill.name.toLowerCase() === newSkill)) {

      //get skill info from all skills
      this.selectedSkill = this.skillService.getSelectedSkill(newSkill);

      if (this.selectedSkill == null) {
        console.log('this skill is not in the all-skill list')
      } else {
        console.log('in all-skill list');
        //and update this skill to current mentor
        this.currentStaff.mentorSkills.push(this.selectedSkill);
      }

      newSkill = ""
    }
  }

  getCurrentStaff(): void {
    this.currentStaff = this.staffService.currentStaff
  }

  delete(skill: string) {
    // this.currentStaff.mentorSkills = [{name: 'test'}, {name: 'autotest'}]
    console.log('deleting skill: ' + skill)
    this.currentStaff.mentorSkills = this.currentStaff.mentorSkills.filter(mentorskill => mentorskill.name != skill)
  }

  ngOnInit(): void {
    this.getCurrentStaff();
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
    <form>
      <md-select placeholder="Mentee" [(ngModel)]="selectedValue" name="mentee">
        <md-option *ngFor="let mentee of mentees" [value]="mentee.value">
          {{mentee.viewValue}}
        </md-option>
      </md-select>
      <p> Mentee: {{selectedValue}} </p>
    </form>
  `,
})
export class MentorDialog {
  constructor(@Optional() public dialogRef: MdDialogRef<MentorDialog>) {
  }

  selectedValue: string;

  mentees = [
    {value: 'Di', viewValue: 'Di Zhang'},
    {value: 'Yang', viewValue: 'Yang Shen'},
    {value: 'Cillin', viewValue: 'Cillin Hearns'},
    {value: 'Daniel', viewValue: 'Daniel Kate'},
    {value: 'Alex', viewValue: 'Alex Alexis'},
    {value: 'Jad', viewValue: 'Jad Jeff'}
  ];
}
