import { Component } from '@angular/core';
import { NavController, PopoverController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

import { HomeServiceProvider, Icity, CollectionData } from "../../providers/home-service/home-service";
import 'rxjs/add/operator/catch';
import { RestaurantDetailPage } from '../restaurant-detail/restaurant-detail';
import { RestaurantListPage } from '../restaurant-list/restaurant-list';
import { LoginPage } from '../login/login';
import { ProfilePopOverPage } from '../profile-pop-over/profile-pop-over';
import { EditProfilePage } from '../edit-profile/edit-profile';
import { AuthProvider } from "../../providers/auth/auth";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  searchByRestaurantName;
  city: Icity;
  gender:any;
  collections: CollectionData;
  restaurants;
  searchByCityName;
  categories;
  resultedRestaurants: Array<any>;
  resultedSearch: string;
  userProfile: any;

  constructor(
    public navCtrl: NavController,
    private hsp: HomeServiceProvider,
    private toastCtrl: ToastController,
    public popoverCtrl: PopoverController,
    private ap: AuthProvider) {
    this.userProfile = JSON.parse(localStorage.getItem('userProfile'));
    this.searchByCityName = '';
    this.searchByRestaurantName = '';
    this.resultedRestaurants = undefined;
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

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(ProfilePopOverPage);
    popover.present({
      ev: myEvent
    });

    popover.onDidDismiss( (data) => {
      switch(data) {
        case 1: this._moveToProfile();break;
        case 2 : this._logout();break;
        default: console.log('default');
      }
    });
  }

  ionViewDidLoad() {
    this._getLocation();
    this._getCategories();
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

  private _getCategories() {
    this.hsp.getCategories()
      .subscribe(data => {
        this.categories = data;
      }, err => {
        console.log(err);
    });
  }

  search() {
    if(this.searchByCityName !== '' || this.searchByRestaurantName !== '') {
      if ( this.searchByCityName !== '' && this.searchByRestaurantName !== '') {
        console.log('city name and restaurant name');
        this._getCityId(this.searchByCityName);
      } else if ( this.searchByCityName !== '') {
        console.log('city name');
        this.getByCityName();
      } else {
        console.log('restaurant name');
        this.getByRestaurantName();
      }
    } else {
      this.presentToast('please fill the search bar', 'top');
    }
  }

  private getByRestaurantName() {
    this.hsp.getRestaurantsByName(this.searchByRestaurantName)
      .subscribe(data => {
        if(data.length === 0 ) {
          this.presentToast('no restaurants found for this search', 'top');
        } else {
          this.resultedRestaurants = data.slice(0,10);
          this.resultedSearch = this.searchByRestaurantName;
          console.log(this.resultedRestaurants);
        }
      }, err => {
        console.log(err);
      });
  }

  private getByCityName() {
    this.hsp.getCityDetailsByCityName(this.searchByCityName)
    .subscribe(data => {
      if (data[0] === undefined) {
        this.presentToast('no city found for this search', 'top');
        console.log('no city is found for this search');
        return;
      }
      this.city = data[0];
      this._getRestaurants(this.city.id);
      this._getCollection(this.city.id);
    }, err => {
      console.log(err);
    });
  }

  private _getCityId(cityName: string) {
    this.hsp.getCityDetailsByName(cityName)
    .subscribe( (data:Array<any>) => {
      if( data.length === 0) {
        console.log('no city found');
        // this.presentToast('no restaurants found for this search', 'top');
        console.log('city id is failed so calling by restaurant name');
        this.getByRestaurantName(); // special case
      } else {
        this.city = data[0];
        console.log(this.city.id);
        this.getByNameAndId(this.city.id);
        this._getRestaurants(this.city.id);
        this._getCollection(this.city.id);
      }
    },err => {
      console.log(err);
    })
  }

  private getByNameAndId(cityId: number) {
    this.hsp.getRestaurantsByNameAndCityName(cityId, this.searchByRestaurantName)
      .subscribe(data => {
        if (data.length === 0) {
          // this.presentToast('no restaurant found for this search', 'top');
          console.log('restaurant name is failed so calling by city name')
          this.getByCityName(); // special case
        } else {
          this.resultedRestaurants =  data.slice(0,10);
          this.resultedSearch = this.searchByRestaurantName;
          console.log(this.resultedRestaurants);
        }
      }, err => {
        console.log(err);
      });
  }

  private _getLocation() {
    navigator.geolocation.getCurrentPosition( data => {
       this._getCityDetails(data.coords.latitude, data.coords.longitude);
    }, err => {
      console.log('error getting the location')
    });
  }

  private _getCityDetails(lat: number, lon: number) {
    this.hsp.getCityDetails(lat,lon)
    .subscribe( data => {
      this.city = data[0];
      this.searchByCityName = this.city.name;
      this._getRestaurants(this.city.id);
      this._getCollection(this.city.id);
    },err => {
      console.log(err);
    })
  }

  private _getCollection(city_id: number) {
    this.hsp.getCollectionByCityId(city_id)
    .subscribe( data => {
      this.collections = data;
    }, err => {
      console.log(err);
    });
  }

  private _getRestaurants(city_id: number) {
    this.hsp.getRestaurantsById(city_id)
    .subscribe(data => {
      this.restaurants = data['best_rated_restaurant']
    }, err => {
      console.log(err);
    })
  }

  moveToRestaurantDetail(res_id: number) {
    this.navCtrl.push(RestaurantDetailPage,{res_id:res_id});
  }

  moveToRestaurantListByCollection(collection_id: number) {
    let restaurantList: Object = { collection_id:collection_id, city_id:this.city.id }
    this.navCtrl.push(RestaurantListPage, {restaurant_list: restaurantList});
  }

  moveToRestaurantListByCategory(category_id: number) {
    let restaurantList: Object = { category_id:category_id, city_id:this.city.id }
    this.navCtrl.push(RestaurantListPage, {restaurant_list: restaurantList});
  }

  private _logout(){
    let deviceToken = localStorage.getItem('token');
    if(deviceToken){
      let userProfile = JSON.parse(localStorage.getItem('userProfile'));
      let payload = {
        user_id: userProfile.user_id,
        token: localStorage.getItem('token')
      }
      this.ap.loggedOut(payload)
      .subscribe(data => {
        // console.log(data);
        localStorage.removeItem('userProfile');
        this.navCtrl.push(LoginPage);
      }, err => {
        console.log(err);
        this.presentToast(err, 'top');
      });
    }else {
      console.log('no token found');
    }
  }

  private _moveToProfile() {
    this.navCtrl.push(EditProfilePage);
  }
}


