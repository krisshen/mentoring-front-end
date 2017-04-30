import {Component, OnInit} from '@angular/core';
import {LoginService} from '../../services/login.service';
import {environment} from 'app/../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private loginService: LoginService) {
  }

  backgroundPhotoUrl: string;
  isloggedIn: boolean

  ngOnInit() {
    if (environment.production) {
      console.log('application running in Production mode')
    }
    else {
      console.log('application running in Development mode')
    }
    this.backgroundPhotoUrl = 'https://drivenlocal.com/wp-content/uploads/2015/10/Material-design.jpg';
    this.isloggedIn = this.loginService.isLoggedIn();
  }
}
