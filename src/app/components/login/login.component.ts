import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from '../../services/login.service';

declare let gapi: any;

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
  isLoggedIn: boolean = false;
  userName = '';
  imgUrl = '';
  email = '';

  public onSignIn(googleUser): void {
    let profile = googleUser.getBasicProfile();
    this.email = profile.getEmail();
    console.log('Logged in Email: ' + this.email);

    if (this.email.endsWith('assurity.co.nz')) {
      console.log('LoginComponent: Staff User logged in');

      this.setLoginService(googleUser);
      this.userName = this.loginService.userName;
      this.imgUrl = this.loginService.userImageURL;
      this.isLoggedIn = this.loginService.isLoggedIn();

      this.router.navigate(['/mentoring']);
    } else {
      console.log('LoginComponent: Non-assurity User logged in');
      this.signOut();
      alert('Please login with your Assurity account');
    }
  }

  private setLoginService(googleUser) {
    let profile = googleUser.getBasicProfile();
    let id_token = googleUser.getAuthResponse().id_token;

    console.log('ID token: ' + id_token);
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail());

    //ToDo: use my name for now ...
    if (profile.getName() == 'Kris Shen' || profile.getName() == 'Di Zhang' || profile.getName() == 'Cillin Hearns') {
      this.loginService.setAdminFlag(true);
    }
    this.loginService.setLoginFlag(true);
    this.loginService.setLoginUserID(profile.getId());
    this.loginService.setLoginUserIDToken(id_token);
    this.loginService.setLoginUserName(profile.getName());
    this.loginService.setLoginUserEmail(profile.getEmail());
    this.loginService.setLoginUserImageURL(profile.getImageUrl());
  }

  public signOut(): void {
    let auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
    this.loginService.setLoginFlag(false);
    this.isLoggedIn = this.loginService.isLoggedIn();
  }
}
