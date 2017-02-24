import { Injectable } from '@angular/core';
import { Headers, Http } from "@angular/http";

import { Observable } from "rxjs";

import { Staff } from "../entities/staff";


@Injectable()
export class StaffService {
  private headers = new Headers({'Content-Type': 'application/json'});

  // private staffUrl = 'http://localhost:8080/staff/';
  // private allStaffUrl = 'http://localhost:8080/allStaff';
  // private newStaffUrl = 'http://localhost:8080/newStaff/';
  // private staffSkillsChangeUrl = 'http://localhost:8080/staffSkillsUpdate/';
  private staffUrl = '/staff/';
  private allStaffUrl = '/allStaff';
  private newStaffUrl = '/newStaff/';
  private staffSkillsChangeUrl = '/staffSkillsUpdate/';

  currentStaff: Staff;
  allStaff: Staff[];
  isStaffLoaded: boolean = false;
  allStaffLoaded: boolean = false;

  constructor(private http: Http) { }

  getStaff(id: string): Observable<any> {
    return this.http
      .get(this.staffUrl + id)
      .map(res => res.json())
      .catch((error: any) => Observable.throw('getStaff error'));
  }

  getAllStaff(): Observable<any> {
    return this.http
      .get(this.allStaffUrl)
      .map(res => res.json())
      .catch((error: any) => Observable.throw('getAllStaff error'));
  }

  putNewStaff(staff: Staff, id: string): Observable<any> {
    return this.http
      .post(this.newStaffUrl + id, JSON.stringify(staff), {headers: this.headers})
      .map(res => res.json())
      .catch((error: any) => Observable.throw('putNewStaff error'));
  }

  putStaffSkillsChange(staff: Staff, id: string): Observable<any> {
    return this.http
      .post(this.staffSkillsChangeUrl + id, JSON.stringify(staff), {headers: this.headers})
      .map(res => res.json())
      .catch((error: any) => Observable.throw('putStaffSkillsChange error'));
  }
}
