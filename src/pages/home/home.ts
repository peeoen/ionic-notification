import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { CacheService } from 'ionic-cache';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  films: Observable<any>;
  filmsKey = 'my-films-group';

  constructor(public navCtrl: NavController,
    private http: HttpClient,
    private cache: CacheService,
    private toastCtrl: ToastController) {
      this.cache.clearExpired();
  }

  loadFilms(refresher?) {
    let url = 'https://jsonplaceholder.typicode.com/posts';
    let req = this.http.get(url).pipe(
      map((res: any) => {
        console.log(res);
        
        let toast = this.toastCtrl.create({
          message: 'new data from API loaded',
          duration: 2000
        });
        toast.present();
        return res;
      })
    )
    let ttl = 5;
    setTimeout(() => {
      this.cache.clearExpired();
    }, 6000);

    if (refresher) {
      let deleyType = 'all';
      this.films = this.cache.loadFromDelayedObservable(url, req, this.filmsKey, ttl, deleyType);
      this.films.subscribe(data => {
        refresher.complete();
      })
    }
    else {
      this.films = this.cache.loadFromObservable(url, req, this.filmsKey, ttl);
    }
  }

  invalidCache() {
    this.cache.clearGroup(this.filmsKey);
  }

  foeceReload(refresher) {
    this.loadFilms(refresher);
  }

}
