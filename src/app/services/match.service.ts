import { Injectable } from '@angular/core';
import { Headers, Http } from "@angular/http";

import { Observable } from "rxjs";

import { Match } from "../entities/match";


@Injectable()
export class MatchService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private matchUrl = 'http://localhost:8080/match';

  constructor(private http: Http) { }

  putMatch(match: Match): Observable<any> {
    console.log(JSON.stringify(match));

    return this.http
      .post(this.matchUrl, JSON.stringify(match), {headers: this.headers})
      .map(res => res.json())
      .catch((error:any) => Observable.throw('Server error'));
  }
}
