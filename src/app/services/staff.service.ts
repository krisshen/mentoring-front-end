import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import {Staff} from "../entities/staff";



@Injectable()
export class StaffService {


  constructor(private http: Http) { }

  getStaff(id: number): Staff {

    return {id: 1, name: "kris", mentorSkills: [{name: 'Swimming'}, {name: 'Driving'}], menteeSkills: [{name: 'Cooking'}, {name: 'Fishing'}, {name: 'Hiking'}]}
  }

  updateStaff(staff: Staff): Promise<Staff> {

    return
  }

}
