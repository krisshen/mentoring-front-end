import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

declare var gapi:any;

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent {

  constructor(ngZone: NgZone, private router: Router, private loginService: LoginService) {
    window['onSignIn'] = (user) => ngZone.run(() => this.onSignIn(user));
    window['signOut'] = (user) => ngZone.run(() => this.signOut());
  }

  title = 'app works!';

  public onSignIn(googleUser):void {
    var profile = googleUser.getBasicProfile();
    var id_token = googleUser.getAuthResponse().id_token; // This is an ID token
    console.log('ID token: ' + id_token);
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail());
    if (profile.getEmail().endsWith('assurity.co.nz')) {
      this.router.navigate(['/mentoring'])
      this.loginService.setLoginFlag(true)
    }
  }

  public signOut():void {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
    this.loginService.setLoginFlag(false)
  }
}
