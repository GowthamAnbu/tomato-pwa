import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { RestaurantServiceProvider } from "../../providers/restaurant-service/restaurant-service";
import { RestaurantDetailPage } from '../restaurant-detail/restaurant-detail';

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
      console.log('category call');
    } else {
      this.rsp.getRestaurantsByCollectionId(this.navRestaurantList)
      .subscribe(data => {
       this.restaurantList = data.slice(0,10);
      }, err => {
        console.log(err);
      });
    }
  }

  moveToRestaurantDetail(res_id: number) {
    this.navCtrl.push(RestaurantDetailPage,{res_id:res_id});
  }

}
