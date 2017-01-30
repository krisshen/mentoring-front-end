import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';

import 'rxjs/add/operator/toPromise';
import {Skill} from "../entities/skill";


@Injectable()
export class SkillService {


  constructor(private http: Http) {
  }

  allskills: Skill[]

  getAllSkills(): Skill[] {
    this.allskills = [
      {id: '1', category: 'IT', name: 'test'},
      {id: '2', category: 'IT', name: 'dev'},
      {id: '3', category: 'IT', name: 'coach'}
    ]
    return this.allskills
  }

  getSelectedSkill(skillName: string): Skill {

    return this.allskills.find(skill => skill.name == skillName)

  }

}
