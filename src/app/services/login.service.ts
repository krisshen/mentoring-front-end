import {Injectable} from "@angular/core";
/**
 * Created by kris on 22/01/17.
 */

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
