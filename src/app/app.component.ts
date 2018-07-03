import { Component } from '@angular/core';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Platform } from 'ionic-angular';
import { CacheService } from 'ionic-cache';
import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private push: Push, private cache: CacheService) {
    platform.ready().then(() => {
      cache.setDefaultTTL(60 * 60 * 12);
      cache.setOfflineInvalidate(false);

      statusBar.styleDefault();
      splashScreen.hide();
      this.pushSetup();
    });
  }

  pushSetup() {
    const options: PushOptions = {
      android: {
        senderID: '568589664160'
      },
      ios: {
        alert: 'true',
        badge: true,
        sound: 'false'
      }
    };

    const pushObject: PushObject = this.push.init(options);


    pushObject.on('notification').subscribe((notification: any) => console.log('Received a notification', notification));

    pushObject.on('registration').subscribe((registration: any) => console.log('Device registered', registration));

    pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
  }
}

