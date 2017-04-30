import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from "rxjs";
import {Skill} from "../entities/skill";
import {environment} from 'app/../environments/environment';


@Injectable()
export class SkillService {
  private skillsUrl// = '/skills';
  // private skillsUrl = 'http://localhost:8080/skills';

  constructor(private http: Http) {
    if (environment.production) {
      this.skillsUrl = '/skills'
    }
    else {
      this.skillsUrl = 'http://localhost:8080/skills'
    }
  }

  allSkills: Skill[];
  allSkillsName: string[] = [];
  skillsByCategoryID: Skill[];

  getAllSkills(): Observable<any> {
    return this.http
      .get(this.skillsUrl)
      .map(res => res.json())
      .catch((error: any) => Observable.throw('getAllSkills error'));
  }

  getAllSkillsName(): void {
    for (let skill of this.allSkills) {
      this.allSkillsName.push(skill.name)
    }
  }

  getSkillsByCategoryID(category_id: string): Skill[] {
    this.skillsByCategoryID = this.allSkills.filter(skill => skill.categoryID == category_id);
    return this.skillsByCategoryID
  }
}
