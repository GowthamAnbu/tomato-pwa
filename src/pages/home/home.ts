import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { HomeServiceProvider, Icity, CollectionData } from "../../providers/home-service/home-service";
import 'rxjs/add/operator/catch';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  cities;
  searchText;
  city: Icity;
  gender:any;
  collection: CollectionData;
  restaurants;
  constructor(public navCtrl: NavController, private hsp: HomeServiceProvider) {
    this.cities =[
      {
        "location_suggestions": [
          {
            "id": 4,
            "name": "Bangalore",
            "country_id": 1,
            "country_name": "India",
            "country_flag_url": "https://b.zmtcdn.com/images/countries/flags/country_1.png",
            "should_experiment_with": 0,
            "discovery_enabled": 0,
            "has_new_ad_format": 1,
            "is_state": 0,
            "state_id": 0,
            "state_name": "",
            "state_code": ""
          }
        ],
        "status": "success",
        "has_more": 0,
        "has_total": 0
      },
      {
        "location_suggestions": [
          {
            "id": 7,
            "name": "Chennai",
            "country_id": 1,
            "country_name": "India",
            "country_flag_url": "https://b.zmtcdn.com/images/countries/flags/country_1.png",
            "should_experiment_with": 0,
            "discovery_enabled": 0,
            "has_new_ad_format": 1,
            "is_state": 0,
            "state_id": 0,
            "state_name": "",
            "state_code": ""
          }
        ],
        "status": "success",
        "has_more": 0,
        "has_total": 0
      },
      {
        "location_suggestions": [
          {
            "id": 30,
            "name": "Coimbatore",
            "country_id": 1,
            "country_name": "India",
            "country_flag_url": "https://b.zmtcdn.com/images/countries/flags/country_1.png",
            "should_experiment_with": 0,
            "discovery_enabled": 0,
            "has_new_ad_format": 1,
            "is_state": 0,
            "state_id": 0,
            "state_name": "",
            "state_code": ""
          }
        ],
        "status": "success",
        "has_more": 0,
        "has_total": 0
      },
      {
        "location_suggestions": [
          {
            "id": 3,
            "name": "Mumbai",
            "country_id": 1,
            "country_name": "India",
            "country_flag_url": "https://b.zmtcdn.com/images/countries/flags/country_1.png",
            "should_experiment_with": 0,
            "discovery_enabled": 0,
            "has_new_ad_format": 1,
            "is_state": 0,
            "state_id": 0,
            "state_name": "",
            "state_code": ""
          }
        ],
        "status": "success",
        "has_more": 0,
        "has_total": 0
      }
    ];
    this.searchText = '';
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
    console.log(res_id);
    // window.location.href = url;
  }
}


