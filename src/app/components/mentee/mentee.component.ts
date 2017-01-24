import { Component, OnInit } from '@angular/core';
import {SkillService} from "../../services/skill.service";
import {StaffService} from "../../services/staff.service"
import {Skill} from "../../entities/skill";
import {Staff} from "../../entities/staff";

@Component({
  moduleId: module.id,
  selector: 'mentee',
  templateUrl: 'mentee.component.html',
  styleUrls: ['mentee.component.css']
})
export class MenteeComponent implements OnInit{

  constructor(private skillService: SkillService, private staffService: StaffService) {}

  // skills = ['Concordion', 'Cucumber', 'Selenium', 'C++', 'Scrum Master', 'ISTQB'];
  allSkills: Skill[]
  allSkillsNames = []
  currentStaff: Staff

  addSkill(newSkill: string) {
    if (newSkill.trim()!='' && !this.currentStaff.menteeSkills.find(skill => skill.name.toLowerCase() === newSkill.trim().toLowerCase())) {
      this.currentStaff.menteeSkills.push({name: newSkill});
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
    this.currentStaff.mentorSkills = this.currentStaff.menteeSkills.filter(menteeskill => menteeskill.name != skill)
  }

  ngOnInit(): void {
    this.getAllSkills();
    this.getAllSkillsNames();
    this.getCurrentStaff();
  }
}

