/**
 * Created by Cao on 2017/3/26.
 */
import { Injectable } from '@angular/core'
import { Http, Headers, Response, URLSearchParams } from "@angular/http";
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Observable } from "rxjs/observable";
import { Hero } from "../hero";
import { MyDateTime } from "./date-time";

@Injectable()
export class HTTPTestService {
  constructor(private _http: Http) {

  }

  getHero() {
    let params = new URLSearchParams();
    params.set('format', 'json');
    return this._http
               .get(
                 'http://localhost:8000/hero/',
                 {
                   search: params
                 }
               )
               .map(res => res.json());
  }


  getCurrentTimeObjByObservable(): Observable<MyDateTime> {
    return this._http.get('http://date.jsontest.com')
               .map(res => res.json())
               .catch(this.handleError);
  }


  getCurrentTimeObjByPromise(): Promise<MyDateTime> {
    return this._http.get('http://date.jsontest.com')
               .toPromise()
               .then(res => res.json() as MyDateTime);
  }


  getCurrentTime() {
    return this._http.get('http://date.jsontest.com').map(res => res.json());
  }

  postJson() {
    var json = JSON.stringify({var1: 'test', var2: 3});
    var params = 'json=' + json;
    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return this._http.post('http://validate.jsontest.com',
      params, {
        headers: headers
      })
               .map(res => res.json);
  }

  private handleError(error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
