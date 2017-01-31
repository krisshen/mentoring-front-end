import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import {StaffService} from "../../services/staff.service";

@Component({
  selector: 'mentoring',
  templateUrl: 'mentoring.component.html',
  styleUrls: ['mentoring.component.css']
})
export class MentoringComponent implements OnInit {

  constructor(private staffService: StaffService, private router: Router, private loginService: LoginService) {
    console.log('initializing mentoring constructor')
  }

  isloggedIn: boolean;

  ngOnInit() {
    this.isloggedIn = this.loginService.isLoggedIn();
    if(!this.isloggedIn) {
      console.log('mentoring.OnInit... user not logged in')
      this.router.navigate(['/'])
    }
    else {
      console.log('mentoring.OnInit... user logged in')
      // this.staffService.getStaff('asd')
    }
  }
}
