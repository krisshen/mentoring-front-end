import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import {Staff} from "../entities/staff";
import {Skill} from "../entities/skill";



@Injectable()
export class StaffService {

  staff: Staff

  constructor(private http: Http) { }

  getStaff(id: number): Staff {

    //return {id: 1, name: "kris", mentorSkills: [{name: 'Swimming'}, {name: 'Driving'}], menteeSkills: [{name: 'Cooking'}, {name: 'Fishing'}, {name: 'Hiking'}]}
     this.staff = {
      id: '1',
      name: 'a Tester',
      email: 'test@gmail.com',
      mentorSkills: [{id: '1', category: 'IT', name: 'test'}, {id: '2', category: 'IT', name: 'dev'}],
      menteeSkills: [{id: '1', category: 'IT', name: 'test'}, {id: '2', category: 'IT', name: 'dev'}]
    }

    return this.staff

  }

  updateStaff(staff: Staff): Promise<Staff> {

    return
  }

}
