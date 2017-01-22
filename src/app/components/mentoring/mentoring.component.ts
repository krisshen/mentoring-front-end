import { Component, OnInit } from '@angular/core';
import {LoginService} from "../../services/login.service";

@Component({
  selector: 'mentoring',
  templateUrl: 'mentoring.component.html',
  styleUrls: ['mentoring.component.css']
})
export class MentoringComponent implements OnInit {

  constructor(private loginService: LoginService) { }

  isloggedIn: boolean

  ngOnInit() {
    this.isloggedIn = this.loginService.isLoggedIn()
  }

}
