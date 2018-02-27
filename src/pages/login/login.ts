import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { AuthProvider } from "../../providers/auth/auth";
import { HomePage } from '../home/home';
import { ToastController } from 'ionic-angular';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  login = { email: '', password: '' };
  submitted = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private ap: AuthProvider,
    private toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
  }

  presentToast(message: string, position: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: position
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

  onLogin(form: NgForm) {
    this.submitted = true;
    if (form.valid) {
      this.ap.login(this.login.email, this.login.password)
      .subscribe(data => {
        this.navCtrl.push(HomePage);
      }, err => {
        console.log(err.error.message);
        this.presentToast(err.error.message, 'top');
      });
    }
  }

  onSignup() {
    this.navCtrl.push(SignupPage);
  }

}
