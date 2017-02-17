import { Injectable } from '@angular/core';
import { Headers, Http } from "@angular/http";

import { Observable } from "rxjs";

import { Match } from "../entities/match";


@Injectable()
export class MatchService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private allMatchUrl = 'http://localhost:8080/allMatch/';
  private matchChangeUrl = 'http://localhost:8080/match';

  constructor(private http: Http) { }

  allMatch: Match[];
  matchAmount: number;
  isMatching: boolean = false;
  isSubmitted: boolean = false;

  getAllMatch(name: string): Observable<any> {
    return this.http
      .get(this.allMatchUrl + name)
      .map(res => res.json());
  }

  putMatch(match: Match): Observable<any> {
    return this.http
      .post(this.matchChangeUrl, JSON.stringify(match), {headers: this.headers})
      .map(res => res.json())
      .catch((error:any) => Observable.throw('Server error'));
  }
}
