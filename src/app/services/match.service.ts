import {Injectable} from '@angular/core';
import {Headers, Http} from "@angular/http";
import {Observable} from "rxjs";
import {Match} from "../entities/match";
import {environment} from 'app/../environments/environment';


@Injectable()
export class MatchService {
  private headers = new Headers({'Content-Type': 'application/json'});

  // private allMatchUrl = 'http://localhost:8080/allMatch/';
  // private matchChangeUrl = 'http://localhost:8080/match';
  // private matchDeleteUrl = 'http://localhost:8080/deleteMatch/';
  private allMatchUrl //= '/allMatch/';
  private matchChangeUrl //= '/match';
  private matchDeleteUrl //= '/deleteMatch/';

  constructor(private http: Http) {
    if (environment.production) {
      this.allMatchUrl = '/allMatch/';
      this.matchChangeUrl = '/match';
      this.matchDeleteUrl = '/deleteMatch/';
    }
    else {
      this.allMatchUrl = 'http://localhost:8080/allMatch/';
      this.matchChangeUrl = 'http://localhost:8080/match';
      this.matchDeleteUrl = 'http://localhost:8080/deleteMatch/';
    }
  }

  allMatch: Match[];
  matchAmount: number;
  isMatching: boolean = false;
  isSubmitted: boolean = false;

  getAllMatch(name: string): Observable<any> {
    return this.http
      .get(this.allMatchUrl + name)
      .map(res => res.json())
      .catch((error: any) => Observable.throw('getAllMatch error'));
  }

  putMatch(match: Match): Observable<any> {
    return this.http
      .post(this.matchChangeUrl, JSON.stringify(match), {headers: this.headers})
      .map(res => res.json())
      .catch((error: any) => Observable.throw('putMatch error'));
  }

  deleteMatch(mentor: string, mentee: string, skill: string): Observable<any> {
    return this.http
      .delete(this.matchDeleteUrl + mentor + '/' + mentee + '/' + skill)
      .map(res => res.json())
      .catch((error: any) => Observable.throw('deleteMatch error'));
  }
}
