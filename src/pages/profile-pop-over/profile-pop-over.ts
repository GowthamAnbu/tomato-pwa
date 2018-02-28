import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-profile-pop-over',
  templateUrl: 'profile-pop-over.html',
})
export class ProfilePopOverPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
  }

  close(data: number) {
    this.viewCtrl.dismiss(data);
  }
}
