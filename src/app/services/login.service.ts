import {Injectable} from "@angular/core";

@Injectable()
export class LoginService {

  constructor() {}

  loginFlag = false

  setLoginFlag(flag: boolean) {
    this.loginFlag = flag
  }

  isLoggedIn():boolean {
    return this.loginFlag
  }

}
