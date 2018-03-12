import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { HomeServiceProvider } from '../providers/home-service/home-service';
import { RestaurantDetailPage } from "../pages/restaurant-detail/restaurant-detail";
import { RestaurantServiceProvider } from '../providers/restaurant-service/restaurant-service';
import { RestaurantListPage } from "../pages/restaurant-list/restaurant-list";
import { LoginPage } from "../pages/login/login";
import { SignupPage } from "../pages/signup/signup";
import { AuthProvider } from '../providers/auth/auth';
import { ProfilePopOverPage } from "../pages/profile-pop-over/profile-pop-over";
import { EditProfilePage } from "../pages/edit-profile/edit-profile";
import { RestaurantlistPage } from "../pages/restaurantlist/restaurantlist";

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { firebaseConfig } from "../environment/environment";
import { FirebaseProvider } from '../providers/firebase/firebase';
import * as firebase from "firebase";
import { UserProvider } from '../providers/user/user';

firebase.initializeApp(firebaseConfig);
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    RestaurantDetailPage,
    RestaurantListPage,
    LoginPage,
    SignupPage,
    ProfilePopOverPage,
    EditProfilePage,
    RestaurantlistPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp, {}, {
      links:[
        {component:HomePage, name:'homepage'},
        {component:LoginPage, name:'loginPage'},
        {component:SignupPage, name:'signupPage'},
        {component: RestaurantDetailPage, name: 'restaurantDetailPage', segment:'restaurantDetailPage/:res_id'},
        {component: RestaurantListPage, name: 'restaurantListPage', segment:'restaurantListPage/:restaurant_list'},
        {component: EditProfilePage, name:'editProfilePage'}
      ]
    }),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    RestaurantDetailPage,
    RestaurantListPage,
    SignupPage,
    ProfilePopOverPage,
    EditProfilePage,
    RestaurantlistPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HomeServiceProvider,
    RestaurantServiceProvider,
    AuthProvider,
    AngularFireDatabase,
    FirebaseProvider,
    UserProvider
  ]
})
export class AppModule {}
