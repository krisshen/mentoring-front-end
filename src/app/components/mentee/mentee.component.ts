import {Component, OnInit} from '@angular/core';
import {SkillService} from '../../services/skill.service';
import {StaffService} from '../../services/staff.service';
import {Skill} from '../../entities/skill';
import {Staff} from '../../entities/staff';

@Component({
  moduleId: module.id,
  selector: 'mentee',
  templateUrl: 'mentee.component.html',
  styleUrls: ['mentee.component.css']
})
export class MenteeComponent implements OnInit {

  constructor(private skillService: SkillService, private staffService: StaffService) {
  }

  // skills = ['Concordion', 'Cucumber', 'Selenium', 'C++', 'Scrum Master', 'ISTQB'];
  selectedSkill: Skill
  allSkills: Skill[]
  allSkillsNames = []
  currentStaff: Staff

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
    this.currentStaff = this.staffService.getStaff(1)
  }

  delete(skill: string) {
    // this.currentStaff.mentorSkills = [{name: 'test'}, {name: 'autotest'}]
    console.log('deleting skill: ' + skill)
    this.currentStaff.menteeSkills = this.currentStaff.menteeSkills.filter(menteeskill => menteeskill.name != skill)
  }

  ngOnInit(): void {
    this.getAllSkills();
    this.getAllSkillsNames();
    this.getCurrentStaff();
  }
}

