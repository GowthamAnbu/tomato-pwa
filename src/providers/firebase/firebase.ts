import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import * as firebase from 'firebase';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class FirebaseProvider {

  messaging = firebase.messaging();
  currentMessage = new BehaviorSubject(null);

  constructor(public http: HttpClient) {
    navigator.serviceWorker.register('../../service-worker.js')
    .then((registration) => {
      this.messaging.useServiceWorker(registration);
      console.log('service worker registered');
    })
    .catch(err => console.error('Error', err));
  }

  getToken() {
    this.messaging.getToken()
    .then( token => {
      console.log(token);
    })
    .catch(function(err) {
      console.log('An error occurred while retrieving token. ', err);
    });
  }

  getPermission() {
    if (localStorage.getItem('token') === null) {
      this.messaging.requestPermission()
      .then(() => {
        console.log('Notification permission granted.');
        return this.messaging.getToken();
      })
      .then(token => {
        console.log(token);
        localStorage.setItem('token', JSON.stringify(token));
      })
      .catch((err) => {
        console.log('Unable to get permission to notify.', err);
      });
    } else {
      console.log('in local storage')
    }
  }

  receiveMessage() {
    this.messaging.onMessage((payload) => {
      console.log('Message received', payload);
      console.log(payload['notification']);
      this.currentMessage.next(payload);
    });
  }
}
