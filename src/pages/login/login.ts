import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { AuthProvider } from "../../providers/auth/auth";
import { HomePage } from '../home/home';
import { ToastController } from 'ionic-angular';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  login: FormGroup;
  email: FormControl;
  password: FormControl;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private ap: AuthProvider,
    private toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    this._setFormValues();
  }

  ionViewCanEnter() {
    if ( localStorage.getItem('userProfile') !== null){
      setTimeout(() => {
        this.navCtrl.push(HomePage);
      }, 0);
      return false;
    } else {
      return true;
    }
  }

  isValidEmail() {
    return this.email.valid || this.email.untouched;
  }

  isValidPassword() {
    return this.password.valid || this.password.untouched;
  }

  private _setFormValues() {
    this.email = new FormControl('', [
      Validators.required,
      Validators.pattern(EMAIL_REGEX)
    ]);
    this.password = new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ]);
    this.login = new FormGroup({
      email: this.email,
      password: this.password
    });
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

  onLogin(values) {
    if (this.login.valid) {
      this.ap.login(values)
      .subscribe(data => {
        this.navCtrl.push(HomePage);
      }, err => {
        console.log(err.error.message);
        this.presentToast(err.error.message, 'top');
      });
    } else {
      this.presentToast('Please fill out the Login Form correctly', 'top');
    }
  }

  onSignup() {
    this.navCtrl.push(SignupPage);
  }

}
