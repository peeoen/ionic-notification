import { Component } from '@angular/core';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AlertController, Platform } from 'ionic-angular';
import { HomePage } from '../pages/home/home';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, 
    splashScreen: SplashScreen, 
    private push: Push, 
    private alertCtrl: AlertController) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
      this.pushSetup();
      this.imageLoaderConfigSetup();
    });
  }

  imageLoaderConfigSetup() {
    // this.imageLoaderConfig.setMaximumCacheSize(20 * 1024 * 1024);
    // this.imageLoaderConfig.setMaximumCacheAge(24 * 60 * 60 * 1000);
  }

  imgCacheServiceSetup() {
      // this.imgCacheService.init({
      //    timeout: 24 * 60 * 60 * 1000,
      // });
      // this.imgCacheService.clearCache();
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
      },
    };

    const pushObject: PushObject = this.push.init(options);

    pushObject.on('notification').subscribe((notification: any) => {
      console.log('noti');
      console.log('Received a notification', notification);
      this.presentConfirm();

      setTimeout(() => {
        console.log('noti');
      }, 1000);
    });

    pushObject.on('registration').subscribe((registration: any) => console.log('Device registered', registration));

    pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
  }


  presentConfirm() {
    let alert = this.alertCtrl.create({
      title: 'Confirm purchase',
      message: 'Do you want to buy this book?'
    });
    alert.present();
  }
  
}

