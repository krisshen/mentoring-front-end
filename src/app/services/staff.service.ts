import { Injectable } from '@angular/core';
import { Headers, Http } from "@angular/http";

import {Observable} from "rxjs";
import 'rxjs/add/operator/toPromise';

import {Staff} from "../entities/staff";


@Injectable()
export class StaffService {
  private headers = new Headers({'Content-Type': 'application/json'});

  private allStaffsUrl = 'staffs';
  private staffUrl = 'http://localhost:8080/staff/';
  private menteeListUrl = 'http://localhost:8080/menteeList';
  private staffSkillsChangeUrl = 'http://localhost:8080/staffSkillsUpdate/';

  currentStaff: Staff;
  isStaffLoaded: boolean;

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


    return this.http.get(this.staffUrl + id)
      .map(res => res.json())

    // return this.currentStaff

  }

  getMenteeList(staffID: string, skillID: string): Observable<any[]> {
    return this.http.get(this.menteeListUrl + staffID + '/' + skillID)
      .map(res => res.json())
  }

  putStaffSkillsChange(staff: Staff, id: string): Observable<any> {
    console.log('Send HTTP request to the backend ******************************* ');
    console.log(JSON.stringify(staff));
    console.log('******************************* ');

    return this.http
      .post(this.staffSkillsChangeUrl + id, JSON.stringify(staff), {headers: this.headers})
      .map(res => res.json())
      .catch((error:any) => Observable.throw('Server error'));
  }
}
