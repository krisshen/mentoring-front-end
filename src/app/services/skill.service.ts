import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from "rxjs";

import { Skill } from "../entities/skill";


@Injectable()
export class SkillService {
  private skillsUrl = 'http://localhost:8080/skills';

  constructor(private http: Http) {
  }

  allSkills: Skill[];
  allSkillsName: string[] = [];

  getAllSkills(): Observable<any> {
    console.log('SkillService.getAllSkills ...');

    return this.http
      .get(this.skillsUrl)
      .map(res => res.json())
  }

  getAllSkillsName(): void {
      for (let skill of this.allSkills) {
      this.allSkillsName.push(skill.name)
    }
  }

  getSelectedSkill(skillName: string): Skill {
    return this.allSkills.find(skill => skill == skillName)
  }
}
