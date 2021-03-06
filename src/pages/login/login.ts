import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
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
  loginDisable: Boolean;
  loader;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private ap: AuthProvider,
    private toastCtrl: ToastController,
    public loading: LoadingController) {
      this.loginDisable = false;
  }

  ionViewDidLoad() {
    this._setFormValues();
    this.loader = this.loading.create({
      content: 'loading',
    });
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
    // let deviceToken = localStorage.getItem('token');
    // if(deviceToken){
      if (this.login.valid) {
        this.loginDisable = true;
        this.loader.present();
        this.ap.login(values)
        .subscribe(data => {
          this.loginDisable = false;
          this.loader.dismiss();
          let payload = {
            user_id: data.user_id,
            token: localStorage.getItem('token')
          }
          this.ap.loggedIn(payload)
          .subscribe(loggedInData => {
            localStorage.setItem('userProfile', JSON.stringify(data));
            this.navCtrl.push(HomePage);
          }, err => {
            console.log(err);
            this.presentToast(err, 'top');
          });
        }, err => {
          this.loginDisable = false;
          this.loader.dismiss();
          console.log(err.error.message);
          this.presentToast(err.error.message, 'top');
        });
      } else {
        this.presentToast('Please fill out the Login Form correctly', 'top');
      }
    // } else {
    //   console.log('no token found');
    // }
  }

  onSignup() {
    this.navCtrl.push(SignupPage);
  }

}
