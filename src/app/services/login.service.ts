import {Injectable} from "@angular/core";

@Injectable()
export class LoginService {

  constructor() {}

  loginFlag = false
  userID: string
  userIDToken: string
  userName: string
  userEmail: string
  userImageURL: string

  setLoginFlag(flag: boolean) {
    this.loginFlag = flag
  }

  isLoggedIn():boolean {
    return this.loginFlag
  }

  setLoginUserID(userID: string) {
    this.userID = userID
  }

  setLoginUserIDToken(userIDToken: string) {
    this.userIDToken = userIDToken
  }

  setLoginUserName(userName: string) {
    this.userName = userName
  }

  setLoginUserEmail(userEmail: string) {
    this.userEmail = userEmail
  }

  setLoginUserImageURL(userImageURL: string) {
    this.userImageURL = userImageURL
  }
}
