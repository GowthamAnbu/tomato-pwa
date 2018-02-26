import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

import { HomeServiceProvider, Icity, CollectionData } from "../../providers/home-service/home-service";
import 'rxjs/add/operator/catch';
import { ResturantDetailPage } from '../resturant-detail/resturant-detail';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  searchText;
  city: Icity;
  gender:any;
  collections: CollectionData;
  restaurants;
  searchByCityName;
  categories;

  constructor(
    public navCtrl: NavController,
    private hsp: HomeServiceProvider,
    private toastCtrl: ToastController) {
    this.searchText = '';
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

  ionViewDidLoad() {
    this._getLocation();
    this._getCategories();
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
    if(this.searchByCityName !== undefined) {
      this.hsp.getCityDetailsByCityName(this.searchByCityName)
      .subscribe(data =>{
        if(data[0] === undefined) {
          this.presentToast('no city found for this search', 'top');
          console.log('no city is found for this search');
          return;
        }
        this.city = data[0];
        this._getRestaurants(this.city.id);
      }, err => {
        console.log(err);
      });
    } else {
      this.presentToast('please type the city name', 'top');
    }
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

  moveTo(res_id: number) {
    this.navCtrl.push(ResturantDetailPage,{res_id:res_id})
  }
}


