import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { HomeServiceProvider } from "../../providers/home-service/home-service";
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  cities;
  searchText;
  city;
  gender:any;
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
      }, err => {
        console.log(err);
      });
    } else {
      console.log('err');
    }
  }
}


