import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/throw'

import { environment } from "../../environment/environment";

@Injectable()
export class UserProvider {
  private api_url: string;

  constructor(public http: HttpClient) {
  }

  getUserDetails(id: number): Observable<any>{
    this.api_url = environment.apiBaseUrl + `userDetails/${id}`;
    return this.http.get(this.api_url)
    .catch(this._handleError);

  }

  updatebyId(payload): Observable<any>{
    let _id = JSON.parse(localStorage.getItem('userProfile')).user_id;
    this.api_url = environment.apiBaseUrl + `updateUser/${_id}`;
    return this.http.post(this.api_url, payload)
    .catch(this._handleError);
  }

  private _handleError(err: HttpErrorResponse) {
    return Observable.throw(err);
  }
}
