import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { RestaurantServiceProvider } from "../../providers/restaurant-service/restaurant-service";
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-restaurant-detail',
  templateUrl: 'restaurant-detail.html',
})
export class RestaurantDetailPage {

  details:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private rsp: RestaurantServiceProvider) {
  }

  ionViewDidLoad() {
    this._getRestaurantDetails(this.navParams.get('res_id'));
  }

  ionViewCanEnter() {
    if ( localStorage.getItem('userProfile') !== null){
      return true;
    } else {
      setTimeout(() => {
        this.navCtrl.push(LoginPage);
      }, 0);
      return false;
    }
  }

  private _getRestaurantDetails(res_id: number) {
    this.rsp.getRestaurantsById(res_id)
    .subscribe(data => {
      this.details = data;
    }, err => {
      console.log(err);
    });
  }
}
