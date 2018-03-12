import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/throw'

import { environment } from "../../environment/environment";

@Injectable()
export class AuthProvider {

  private api_url: string;

  constructor(public http: HttpClient) {
  }

  login(payload: object): Observable<any> {
    this.api_url = environment.apiBaseUrl + `login`;
    return this.http.post(this.api_url, payload)
    /* .do(data => {
      localStorage.setItem('userProfile', JSON.stringify(data));
    }) */
    .catch(this.handleError);
  }

  loggedIn(payload: object): Observable<any> {
    this.api_url = environment.apiBaseUrl + `loggedIn`;
    return this.http.put(this.api_url, payload)
    .do(data => {
      console.log(data);
    })
    .catch(this.handleError);
  }

  loggedOut(payload: object): Observable<any> {
    this.api_url = environment.apiBaseUrl + `loggedOut`;
    return this.http.put(this.api_url, payload)
    .do(data => {
      console.log(data);
    })
    .catch(this.handleError);
  }

  signup(payload: object): Observable<any> {
    this.api_url = environment.apiBaseUrl + `register`;
    return this.http.post(this.api_url, payload)
    .catch(this.handleError);
  }

  private handleError(err: HttpErrorResponse) {
    return Observable.throw(err);
  }

}
