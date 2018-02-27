import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { RestaurantServiceProvider } from "../../providers/restaurant-service/restaurant-service";

@Component({
  selector: 'page-resturant-detail',
  templateUrl: 'resturant-detail.html',
})
export class ResturantDetailPage {

  details:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private rsp: RestaurantServiceProvider) {
  }

  ionViewDidLoad() {
    this._getRestaurantDetails(this.navParams.get('res_id'));
  }

  private _getRestaurantDetails(res_id: number) {
    this.rsp.getRestaurantsById(res_id)
    .subscribe(data => {
      this.details = data;
      console.log(this.details);
    }, err => {
      console.log(err);
    });
  }
}
