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
      {id: '1', category: {id: '1', name: 'IT', comment: 'this is for IT'}, name: 'test'},
      {id: '2', category: {id: '2', name: 'IT', comment: 'this is for IT'}, name: 'dev'},
      {id: '3', category: {id: '3', name: 'Agile', comment: 'this is for IT'}, name: 'coach'}
    ]
    return this.allskills
  }

  getSelectedSkill(skillName: string): Skill {

    return this.allskills.find(skill => skill.name == skillName)

  }

}
