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

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    RestaurantDetailPage,
    RestaurantListPage,
    LoginPage,
    SignupPage
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
        {component: RestaurantListPage, name: 'restaurantListPage', segment:'restaurantListPage/:restaurant_list'}
      ]
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    RestaurantDetailPage,
    RestaurantListPage,
    SignupPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HomeServiceProvider,
    RestaurantServiceProvider
  ]
})
export class AppModule {}
