import { HttpClient,HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

/*
  Generated class for the HomeProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HomeServiceProvider {

  constructor(public http: HttpClient) {
    console.log('Hello HomeProvider Provider');
  }

  getCityDetailsByCityName(searchText: string) : Observable<Icity>{
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
    return this.http.get(`https://developers.zomato.com/api/v2.1/cities?q=${searchText}`, options)
    .map( data => {
      return data['location_suggestions'];
    })
    .catch(this.handleError);
  }

  getCityDetails(lat: number,lon: number) : Observable<Icity>{
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
    return this.http.get(`https://developers.zomato.com/api/v2.1/cities?lat=${lat}&lon=${lon}`, options)
    .map( data => {
      return data['location_suggestions'];
    })
    .catch(this.handleError);
  }

  getDataByLocation(lat: number, lon: number): Observable<CollectionData> {
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
    return this.http.get(`https://developers.zomato.com/api/v2.1/collections?lat=${lat}&lon=${lon}`, options)
    .map( (data: CollectionData) => {return data.collections})
    .catch(this.handleError);
  }

  getRestaurantsById(city_id: number) : Observable<Icity>{
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
    return this.http.get(`https://developers.zomato.com/api/v2.1/location_details?entity_id=${city_id}&entity_type=city`, options)
    .catch(this.handleError);
  }

  getCollectionByCityId(cityId: number): Observable<any> {
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
    return this.http.get(`https://developers.zomato.com/api/v2.1/collections?city_id=${cityId}&count=6`, options)
    .map( data => data['collections'])
    .catch(this.handleError);
  }

  getCategories(): Observable<any> {
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
    return this.http.get(`https://developers.zomato.com/api/v2.1/categories`, options)
    .map( data => data['categories'])
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

export interface Icity {
  id: number;
  name: string;
  country_id: number;
  country_name: string;
  country_flag_url: string;
  discovery_enabled: number;
  has_new_ad_format:number;
  is_state: string;
  should_experiment_with: number;
  state_code: string;
  state_id: number;
  state_name: string;
}

export interface Collection {
  collection_id ?: number;
  title ?:string;
  url ?: string;
  description ?: string;
  image_url ?: string;
  res_count ?: number;
  share_url ?: string ;
}

export interface CollectionData {
  collections : Array<Collection>;
}
