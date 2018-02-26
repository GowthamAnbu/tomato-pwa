import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { HomeServiceProvider, Icity, CollectionData } from "../../providers/home-service/home-service";
import 'rxjs/add/operator/catch';
import { ResturantDetailPage } from '../resturant-detail/resturant-detail';
import { Camera, CameraOptions } from '@ionic-native/camera';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  searchText;
  city: Icity;
  gender:any;
  collection: CollectionData;
  restaurants;
  searchText1;
  constructor(public navCtrl: NavController, private hsp: HomeServiceProvider,private camera: Camera) {
    this.searchText = '';
  }

  ionViewDidLoad() {
    this._getLocation();
  }
  openCamera(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64:
     let base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
     // Handle error
    });
  }
 

  search() {
    this.openCamera();
    // if(this.searchText !== '') {
    //   this.hsp.search(this.searchText)
    //   .subscribe(data =>{
    //     if(data[0] === undefined) {
    //       console.log('no city is found for the search');
    //       return;
    //     }
    //     this.city = data[0];
    //     console.log(this.city);
    //   }, err => {
    //     console.log(err);
    //   });
    // } else {
    //   console.log('err');
    // }
  }

  private _getLocation() {
  //  this._getCityDetails(13.083889, 80.27);
    navigator.geolocation.getCurrentPosition( data => {
      //this._getCityDetails(13.083889, 80.27);
       this._getCityDetails(data.coords.latitude, data.coords.longitude);
    }, err => {
      console.log('error getting the location')
    });
  }

  private _getDataByLocation(lat: number, lon: number) {
    this.hsp.getDataByLocation(lat,lon)
    .subscribe( data => {
      this.collection = data;
      console.log(this.collection);
    }, err => {
      console.log(err);
    });
  }

  private _getCityDetails(lat: number, lon: number) {
    this.hsp.getCityDetails(lat,lon)
    .subscribe( data => {
      // console.log(data[0].id);
      this._getRestaurants(data[0].id);
    },err => {
      console.log(err);
    })
  }

  private _getRestaurants(res_id: number) {
    this.hsp.getRestaurantsById(res_id)
    .subscribe(data => {
      this.restaurants = data['best_rated_restaurant']
     console.log(this.restaurants);
    }, err => {
      console.log(err);
    })
  }

  moveTo(res_id: number) {
    this.navCtrl.push(ResturantDetailPage,{res_id:res_id})
  }
}


