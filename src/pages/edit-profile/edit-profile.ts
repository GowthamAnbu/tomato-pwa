import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';


@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
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

}
