import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import {Staff} from "../entities/staff";
import {HttpService} from "./http.service";
import {Http} from "@angular/http";
import {Observable} from "rxjs";



@Injectable()
export class StaffService {

  private allStaffsUrl = 'staffs'
  private staffUrl = 'http://localhost:8080/staff/123'

  currentStaff: Staff
  isStaffLoaded: boolean

  constructor(private http: Http) { }

  getStaff(id: string): Observable<any> {

    console.log('StaffService.getStaff ...')
    //  this.currentStaff = {
    //   id: '1',
    //   name: 'a Tester',
    //   email: 'test@gmail.com',
    //   mentorSkills: [{id: '1', category: {id: '1', name: 'IT', comment: 'this is for IT'}, name: 'test'}, {id: '2', category: {id: '2', name: 'IT', comment: 'this is for IT'}, name: 'dev'}],
    //   menteeSkills: [{id: '3', category: {id: '1', name: 'IT', comment: 'this is for IT'}, name: 'test'}, {id: '4', category: {id: '4', name: 'IT', comment: 'this is for IT'}, name: 'dev'}]
    // }

    // this.httpService.get(this.staffUrl)
    //   .subscribe(
    //     data => this.currentStaff = data,
    //     error => alert(error),
    //     () => console.log('Get Request Done')
    //   )
    // console.log(this.currentStaff.name)

    // this.httpService.getStaff(this.staffUrl,'1').then(staff => this.currentStaff = staff)

    // console.log(this.currentStaff)


    return this.http.get(this.staffUrl)
      .map(res => res.json())

    // return this.currentStaff

  }

  // updateStaff(staff: Staff): Promise<Staff> {
  //
  //   return
  // }

}
