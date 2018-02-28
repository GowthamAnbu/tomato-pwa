import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { RestaurantServiceProvider } from "../../providers/restaurant-service/restaurant-service";
import { RestaurantDetailPage } from '../restaurant-detail/restaurant-detail';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-restaurant-list',
  templateUrl: 'restaurant-list.html',
})
export class RestaurantListPage {

  navRestaurantList: any;
  restaurantList: Array<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private rsp:RestaurantServiceProvider) {
  }

  ionViewDidLoad() {
    this.navRestaurantList = this.navParams.get('restaurant_list')
    if (this.navRestaurantList.hasOwnProperty('category_id')) {
    this._getRestaurantByCategory();
    } else {
      this._getRestaurantByCollection();
    }
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

  private _getRestaurantByCategory() {
    this.rsp.getRestaurantsByCategoryId(this.navRestaurantList)
      .subscribe(data => {
        this.restaurantList = data.slice(0, 10);
      }, err => {
        console.log(err);
      });
  }

  private _getRestaurantByCollection() {
    this.rsp.getRestaurantsByCollectionId(this.navRestaurantList)
    .subscribe(data => {
      this.restaurantList = data.slice(0, 10);
    }, err => {
      console.log(err);
    });
  }

  moveToRestaurantDetail(res_id: number) {
    this.navCtrl.push(RestaurantDetailPage,{res_id:res_id});
  }

}
