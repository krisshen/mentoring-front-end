import {Component, OnInit} from '@angular/core';
import {LoginService} from '../../services/login.service';
import {Router} from '@angular/router';
import {SkillService} from "../../services/skill.service";
import {StaffService} from "../../services/staff.service";

@Component({
  moduleId: module.id,
  selector: 'mentoring',
  templateUrl: 'mentoring.component.html',
  styleUrls: ['mentoring.component.css']
})
export class MentoringComponent implements OnInit {

  constructor(private router: Router,
              private loginService: LoginService,
              private staffService: StaffService,
              private skillService: SkillService) {
  }

  isloggedIn: boolean

  ngOnInit() {
    this.isloggedIn = this.loginService.isLoggedIn();

    //if not login, then redirect to root page
    if (!this.isloggedIn) {
      this.router.navigate(['/'])
    }
    else {
      //initialize: get login user info and all-skill list
      this.skillService.getAllSkills()
      this.staffService.getStaff(this.loginService.userID)
    }
  }

}
