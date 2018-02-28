import { HttpClient,HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/throw'

@Injectable()
export class AuthProvider {

  private api_url: string;

  constructor(public http: HttpClient) {
  }

  login(payload: object): Observable<any> {
    this.api_url = `http://localhost:3030/login`;
    return this.http.post(this.api_url, payload)
    .do(data => {
      localStorage.setItem('userProfile', JSON.stringify(data));
    })
    .catch(this.handleError);
  }

  signup(payload: object): Observable<any> {
    this.api_url = `http://localhost:3030/register`;
    return this.http.post(this.api_url, payload)
    .catch(this.handleError);
  }

  private handleError(err: HttpErrorResponse) {
    let error: Error;
    return Observable.throw(err);
  }

}
