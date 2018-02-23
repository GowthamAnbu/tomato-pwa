import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { RestaurantServiceProvider } from "../../providers/restaurant-service/restaurant-service";
/**
 * Generated class for the ResturantDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-resturant-detail',
  templateUrl: 'resturant-detail.html',
})
export class ResturantDetailPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private rsp: RestaurantServiceProvider) {
  }

  ionViewDidLoad() {
    console.log(this.navParams.get('res_id'));
    this._getRestaurantDetails();
  }




  private _getRestaurantDetails() {
    this.rsp.getRestaurantsById(this.navParams.get('res_id'))
      .subscribe(data => {
        console.log(data);
      }, err => {
        console.log(err);
      });
  }
}
