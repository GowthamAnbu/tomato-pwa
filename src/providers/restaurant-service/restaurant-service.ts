import { HttpClient,HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class RestaurantServiceProvider {

  constructor(public http: HttpClient) {
    console.log('Hello RestaurantServiceProvider Provider');
  }

  getRestaurantsById(res_id: number) : Observable<any>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json').set('user-key','65a6618a939f0e3a4ed07dfa3b4cbb07');
    const options: {
      headers?: HttpHeaders,
      observe?: 'body',
      params?: HttpParams,
      reportProgress?: boolean,
      responseType?: 'json',
      withCredentials?: boolean
    } = {
      headers: headers,
    };
    return this.http.get(`https://developers.zomato.com/api/v2.1/restaurant?res_id=${res_id}`, options)
    .catch(this.handleError);
  }

  private handleError(err: HttpErrorResponse) {
    let error: Error;
    if (err.status === 400) {
      error = new Error('400');
      return Observable.throw(error.message);
    }
    return Observable.throw(err.message);
  }

}
