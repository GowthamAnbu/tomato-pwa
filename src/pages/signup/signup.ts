import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from "../../providers/auth/auth";
import { LoginPage } from '../login/login';
import { ToastController } from 'ionic-angular';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {


  register: FormGroup;
  firstName: FormControl;
  lastName: FormControl;
  dob: FormControl;
  email: FormControl;
  password:FormControl;
  mobile: FormControl;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private ap: AuthProvider,
    private toastCtrl: ToastController){
  }

  ionViewDidLoad() {
   this._setFormValues();
  }

  ionViewCanEnter() {
    if ( localStorage.getItem('userProfile') !== null){
      setTimeout(() => {
        this.navCtrl.push(LoginPage);
      }, 0);
      return false;
    } else {
      return true;
    }
  }

  isValidFirstName() {
    return this.firstName.valid || this.firstName.untouched;
  }

  isValidLastName() {
    return this.lastName.valid || this.lastName.untouched;
  }

  isValidDob() {
    return this.dob.valid || this.dob.untouched;
  }

  isValidEmail() {
    return this.email.valid || this.email.untouched;
  }

  isValidPassword() {
    return this.password.valid || this.password.untouched;
  }

  isValidMobile() {
    return this.mobile.valid || this.mobile.untouched;
  }

  private _setFormValues() {
    this.firstName = new FormControl('', [
      Validators.required
    ]);
    this.lastName = new FormControl('', [
      Validators.required
    ]);
    this.dob = new FormControl('', [
      Validators.required
    ]);
    this.email = new FormControl('', [
      Validators.required,
      Validators.pattern(EMAIL_REGEX)
    ]);
    this.password = new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ]);
    this.mobile = new FormControl('', [
      Validators.required,
      Validators.minLength(10)
    ]);
    this.register = new FormGroup({
      firstName: this.firstName,
      lastName: this.lastName,
      dob: this.dob,
      email: this.email,
      password: this.password,
      mobile: this.mobile
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

  onSignup(values) {
    if (this.register.valid) {
      console.log(values);
      this.ap.signup(values)
      .subscribe(data => {
        this.navCtrl.push(LoginPage);
      }, err => {
        console.log(err.error.message);
        this.presentToast(err.error.message, 'top');
      });
    } else {
      this.presentToast('Please fill out the Registration Form correctly', 'top');
    }
  }
}
