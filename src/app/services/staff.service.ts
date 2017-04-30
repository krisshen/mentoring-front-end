import {Injectable} from '@angular/core';
import {Headers, Http} from "@angular/http";
import {Observable} from "rxjs";
import {Staff} from "../entities/staff";
import {environment} from 'app/../environments/environment';


@Injectable()
export class StaffService {
  private headers = new Headers({'Content-Type': 'application/json'});

  // private staffUrl = 'http://localhost:8080/staff/';
  // private allStaffUrl = 'http://localhost:8080/allStaff';
  // private newStaffUrl = 'http://localhost:8080/newStaff/';
  // private staffSkillsChangeUrl = 'http://localhost:8080/staffSkillsUpdate/';
  private staffUrl //= '/staff/';
  private allStaffUrl //= '/allStaff';
  private newStaffUrl //= '/newStaff/';
  private staffSkillsChangeUrl //= '/staffSkillsUpdate/';

  currentStaff: Staff;
  allStaff: Staff[];
  isStaffLoaded: boolean = false;
  allStaffLoaded: boolean = false;

  constructor(private http: Http) {
    if (environment.production) {
      this.staffUrl = '/staff/';
      this.allStaffUrl = '/allStaff';
      this.newStaffUrl = '/newStaff/';
      this.staffSkillsChangeUrl = '/staffSkillsUpdate/';
    }
    else {
      this.staffUrl = 'http://localhost:8080/staff/';
      this.allStaffUrl = 'http://localhost:8080/allStaff';
      this.newStaffUrl = 'http://localhost:8080/newStaff/';
      this.staffSkillsChangeUrl = 'http://localhost:8080/staffSkillsUpdate/';
    }
  }

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
