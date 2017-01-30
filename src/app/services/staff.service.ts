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
  returnedData: string

  constructor(private httpService: HttpService) { }

  getStaff(id: string): Staff {

    // const url = `${this.staffUrl}/${id}`
    const url = this.staffUrl

    // this.httpService.get(url)
    //   .subscribe(
    //     data => this.staff = data,
    //     error => alert(error),
    //     () => console.log('finished GET request')
    //   )
    //
    // console.log(this.staff.id)
    // console.log(this.staff.name)
    // console.log(this.staff.email)

    //return {id: 1, name: "kris", mentorSkills: [{name: 'Swimming'}, {name: 'Driving'}], menteeSkills: [{name: 'Cooking'}, {name: 'Fishing'}, {name: 'Hiking'}]}

    this.httpService.getCurrentTime()
      .subscribe(
        data => this.returnedData = JSON.stringify(data),
        // data => console.log(JSON.stringify(data)),
        error => alert(error),
        () => console.log('complete!')
      )

    console.log(this.returnedData)

    this.currentStaff = {
      id: '1',
      name: 'a Tester',
      email: 'test@gmail.com',
      mentorSkills: [{id: '1', category: 'IT', name: 'test'}, {id: '2', category: 'IT', name: 'dev'}],
      menteeSkills: [{id: '1', category: 'IT', name: 'test'}, {id: '2', category: 'IT', name: 'dev'}]
    }

    return this.currentStaff

  }

  //TODO: will use HTTP method
  upsertStaff(staff: Staff): Promise<Staff> {

    return
  }

}
