import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'mentoring',
  templateUrl: 'mentoring.component.html',
  styleUrls: ['mentoring.component.css']
})
export class MentoringComponent implements OnInit {

  constructor(private router: Router, private loginService: LoginService) { }

  isloggedIn: boolean

  ngOnInit() {
    this.isloggedIn = this.loginService.isLoggedIn()
    if(!this.isloggedIn) {
      this.router.navigate(['/'])
    }
  }
}
