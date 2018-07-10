import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class HttpService {
    constructor(private http: HttpClient) { }
    url = 'http://192.168.1.45:54428/';

    getData(): Observable<any[]> {
        return this.http.get<any[]>(this.url + 'api/values');
    }
}