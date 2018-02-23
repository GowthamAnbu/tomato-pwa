import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { HomeServiceProvider, Icity, CollectionData } from "../../providers/home-service/home-service";
import 'rxjs/add/operator/catch';
import { ResturantDetailPage } from '../resturant-detail/resturant-detail';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  searchText;
  city: Icity;
  gender:any;
  collection: CollectionData;
  restaurants;
  constructor(public navCtrl: NavController, private hsp: HomeServiceProvider) {
    this.searchText = '';
  }

  ionViewDidLoad() {
    this._getLocation();
  }

  search() {
    if(this.searchText !== '') {
      this.hsp.search(this.searchText)
      .subscribe(data =>{
        if(data[0] === undefined) {
          console.log('no city is found for the search');
          return;
        }
        this.city = data[0];
        console.log(this.city);
      }, err => {
        console.log(err);
      });
    } else {
      console.log('err');
    }
  }

  private _getLocation() {
    navigator.geolocation.getCurrentPosition( data => {
      this._getCityDetails(data.coords.latitude, data.coords.longitude);
      // this._getDataByLocation(data.coords.latitude, data.coords.longitude);
    }, err => {
      console.log('error getting the location')
    });
  }

  private _getDataByLocation(lat: number, lon: number) {
    this.hsp.getDataByLocation(lat,lon)
    .subscribe( data => {
      this.collection = data;
      console.log(this.collection);
    }, err => {
      console.log(err);
    });
  }

  private _getCityDetails(lat: number, lon: number) {
    this.hsp.getCityDetails(lat,lon)
    .subscribe( data => {
      // console.log(data[0].id);
      this._getRestaurants(data[0].id);
    },err => {
      console.log(err);
    })
  }

  private _getRestaurants(res_id: number) {
    this.hsp.getRestaurantsById(res_id)
    .subscribe(data => {
      this.restaurants = data['best_rated_restaurant']
     console.log(this.restaurants);
    }, err => {
      console.log(err);
    })
  }

  moveTo(res_id: number) {
    this.navCtrl.push(ResturantDetailPage,{res_id})
  }
}


