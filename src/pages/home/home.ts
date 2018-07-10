import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CacheService } from 'ionic-cache';
import { Observable } from 'rxjs/Observable';
import { HttpService } from '../../services/http.service';

const ttl: number = 60 * 60 * 24;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{
  data: Observable<any[]>;
  dataKey: string = 'data';
  url: string;
  constructor(public navCtrl: NavController,
    private cache: CacheService,
    private httpService: HttpService) {
    this.cache.setDefaultTTL(ttl);
    this.url = this.httpService.url;

  }

  ngOnInit() {
    this.loadData();
  }

  async loadData() {
    this.cache.clearExpired()
    const res = await this.httpService.getData();
    const delayType = 'all';  // this indicates that it should send a new request to the server every time, you can also set it to 'none' which indicates that it should only send a new request when it's expired
    this.data = this.cache.loadFromDelayedObservable<any[]>(this.dataKey, res, 'group_data', ttl, delayType);
  }

  async getCache() {
    const data = await this.cache.getItem(this.dataKey);
    const data1 = await this.cache.getRawItem(this.dataKey);
    console.log(data);
    console.log(data1);
  }
}
