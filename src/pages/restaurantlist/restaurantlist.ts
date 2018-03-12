import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-restaurantlist',
  templateUrl: 'restaurantlist.html',
})
export class RestaurantlistPage {

  @Input()  restaurant: Object;
  @Output() emitId = new EventEmitter<number>();

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
  }

  onClicked(id: number) {
    this.emitId.emit(id);
  }
}
