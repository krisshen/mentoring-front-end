import {Injectable} from "@angular/core"
import {Http} from "@angular/http"
import {Staff} from "../entities/staff";
import {Skill} from "../entities/skill";
import {Observable} from "rxjs";

@Injectable()
export class HttpService {

  constructor(private http: Http) {}

  get(url: string): Observable<any>{
    return this.http.get(url)
      .map(res => res.json())
  }

  getStaff(url: string, id: string): Promise<Staff>{

    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as Staff)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  post(url: string,data: JSON) {

  }

  delete(url: string) {

  }

}
