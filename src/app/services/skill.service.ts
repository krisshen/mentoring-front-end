import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import {Skill} from "../entities/skill";



@Injectable()
export class SkillService {


  constructor(private http: Http) { }

  skills: Skill[]

  getAllSkills(): Skill[] {
    this.skills = [
      {name: 'Automation'},
      {name: 'Agile Coach'},
      {name: 'Java'},
      {name: 'Python'},
      {name: 'Unit Test'},
      {name: 'DevOps'}
    ]
    return this.skills
}

}
