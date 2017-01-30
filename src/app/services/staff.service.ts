import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import {Staff} from "../entities/staff";
import {Skill} from "../entities/skill";
import {HttpService} from "./http.service";



@Injectable()
export class StaffService {

  private allStaffsUrl = 'staffs'
  private staffUrl = 'http://localhost:8080/staff/123'

  currentStaff: Staff

  constructor(private httpService: HttpService) { }

  getStaff(id: string): Staff {

    //return {id: 1, name: "kris", mentorSkills: [{name: 'Swimming'}, {name: 'Driving'}], menteeSkills: [{name: 'Cooking'}, {name: 'Fishing'}, {name: 'Hiking'}]}
     this.currentStaff = {
      id: '1',
      name: 'a Tester',
      email: 'test@gmail.com',
      mentorSkills: [{'id': '1', 'category': 'IT', 'name': 'test'}, {'id': '2', 'category': 'IT', 'name': 'dev'}],
      menteeSkills: [{'id': '1', 'category': 'IT', 'name': 'test'}, {'id': '2', 'category': 'IT', 'name': 'dev'}]
    }

    return this.currentStaff

  }

  // updateStaff(staff: Staff): Promise<Staff> {
  //
  //   return
  // }

}
