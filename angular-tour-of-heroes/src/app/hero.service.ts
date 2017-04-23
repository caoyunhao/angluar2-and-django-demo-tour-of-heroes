/**
 * Created by Cao on 2017/3/15.
 */
// Observable Version
import { Injectable }               from '@angular/core';
import { Http, Headers, Response, URLSearchParams, RequestOptions }  from '@angular/http';
import { Observable }               from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Hero } from './hero';

@Injectable()
export class HeroService {
  //private heroesUrl = 'app/heroes';  // URL to web API
  private rootUrl = 'http://localhost:8000/';  // URL to web API
  //private heroListUrl = this.rootUrl + 'hero/';
  private heroListUrl = 'http://localhost:8000/hero/';
  private heroDetailUrl = this.rootUrl + 'detail/';  // URL to web API

  constructor(private _http: Http) {
  }

  getHeroes(): Observable<Hero[]> {
    //return this.http.get(this.heroesUrl)
    //           .map(res=>res.json())
    //           .catch(this.handleError);
    let params = new URLSearchParams();
    //params.set('format', 'json');
    return this._http
               .get(
                 this.heroListUrl,
                 {
                   search: params
                 }
               )
               .map(res => res.json());
  }

  getHero(id): Observable<Hero> {
    let params = new URLSearchParams();
    //params.set('format', 'json');
    return this._http
               .get(
                 this.heroDetailUrl + id + '/',
                 {
                   //search: params
                 }
               )
               .map(res => res.json());
  }

  updateHero(hero: Hero): Observable<Hero> {
    let params = new URLSearchParams();
    //params.set('format', 'json');
    return this._http
               .put(
                 this.heroDetailUrl + hero.id + '/',
                 {
                   'id': hero.id,
                   'name': hero.name,
                 }
               )
               .map(res => res.json());
  }

  addHero(hero: Hero): Observable<Hero> {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    let data = JSON.stringify(hero);
    return this._http
               .post(this.heroListUrl,
                 {
                   'id': hero.id,
                   'name': hero.name,
                 },
                 options
               )
               .map((res:Response) => res.json());
  }

  deleteHero(hero: Hero): Observable<Hero> {
    let params = new URLSearchParams();
    //params.set('format', 'json');
    return this._http
               .delete(
                 this.heroDetailUrl + hero.id + '/',
                 {}
               )
               .map(res => res.json());
  }

  private extractData(res: Response) {
    let body = res.json();
    return body.data || {};
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
