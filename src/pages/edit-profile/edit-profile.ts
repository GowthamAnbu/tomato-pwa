import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { UserProvider } from '../../providers/user/user';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HomePage } from '../home/home';
import { FirebaseProvider } from '../../providers/firebase/firebase';

import { default as idb } from "idb";
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {

  editProfile: FormGroup;
  firstName: FormControl;
  lastName: FormControl;
  dob: FormControl;
  email: FormControl;
  mobile: FormControl;
  profile: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private up: UserProvider,
    private toastCtrl: ToastController,
    private fp: FirebaseProvider) {
  }

  ionViewDidLoad() {
    let _id = JSON.parse(localStorage.getItem('userProfile')).user_id;
    this.up.getUserDetails(_id)
      .subscribe(data => {
        this.profile = data[0];
        this._setFormValues();
      }, err => {
        console.log('err', err);
      });
  }

  ionViewCanEnter() {
    if (localStorage.getItem('userProfile') !== null) {
      return true;
    } else {
      setTimeout(() => {
        this.navCtrl.push(LoginPage);
      }, 0);
      return false;
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

  isValidMobile() {
    return this.mobile.valid || this.mobile.untouched;
  }

  private _setFormValues() {
    this.firstName = new FormControl(this.profile.firstName, [
      Validators.required
    ]);
    this.lastName = new FormControl(this.profile.lastName, [
      Validators.required
    ]);
    this.dob = new FormControl(this.profile.dob, [
      Validators.required
    ]);
    this.email = new FormControl(this.profile.email, [
      Validators.required,
      Validators.pattern(EMAIL_REGEX)
    ]);
    this.mobile = new FormControl(this.profile.mobile, [
      Validators.required,
      Validators.minLength(10)
    ]);
    this.editProfile = new FormGroup({
      firstName: this.firstName,
      lastName: this.lastName,
      dob: this.dob,
      email: this.email,
      mobile: this.mobile
    });
  }

  presentToast(message: string, position: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 6000,
      position: position
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

  onEdit(values) {
    if (this.editProfile.valid) {
      if (navigator.onLine === true){
        console.log('system is online');
        this.updateById(values);
      } else {
        if ('sync' in this.fp.sw.value) {
          console.log('sync is supported do the stuff here');
          if (!('indexedDB' in window)) {
            console.log('This browser doesn\'t support IndexedDB');
            return;
          } else {
            console.log('IndexedDB is supported cool');
            this._userProfileDb(values);
          }
        } else {
          console.log('sync is not supported you can just do usual thing here :) => calling UPDATE user details service');
          this.updateById(values);
        }
      }
    } else {
      this.presentToast('Please fill out the Edit Form correctly', 'top');
    }
  }

  private updateById(values: any) {
    this.up.updatebyId(values)
      .subscribe(data => {
        if (data.success === 1) {
          this.navCtrl.push(HomePage);
          this.presentToast('Details updated successfully', 'top');
        }
        else {
          this.presentToast('error updating details', 'top');
        }
      }, err => {
        console.log(err);
      });
  }

  private _userProfileDb(formValues) {
    let _id = JSON.parse(localStorage.getItem('userProfile')).user_id;
    let dbPromise = idb.open('Tomato', 1, (upgradeDb) => {
      if (!upgradeDb.objectStoreNames.contains('user_profile')) {
        upgradeDb.createObjectStore('user_profile', { keyPath: '_id' });
      }
    });
    dbPromise.then((db) => {
      let up_tx = db.transaction('user_profile', 'readwrite');
      let up_store = up_tx.objectStore('user_profile');
      let item = {
        _id:_id,
        updateData: formValues
      };
      up_store.add(item);
      return up_tx.complete;
    }).then(() => {
      console.log('added item to the user_profile so moving to home screen');
      this.navCtrl.push(HomePage);
      this.presentToast('you details are saved and will be updated once internet is available', 'top');
      return this.fp.sw.value.sync.register('user_profile');
    })
    .catch(err => {
      console.log('err storing in user_profile or registering sync', err);
    });
  }
}
