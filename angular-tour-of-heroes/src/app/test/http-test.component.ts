/**
 * Created by Cao on 2017/3/26.
 */
import { Component } from '@angular/core'
import { HTTPTestService } from "./http-test.service";
import { MyDateTime } from "./date-time";
import { Observable } from "rxjs/observable";


@Component({
  selector: 'http-test',
  template: `
    <br>
    <button (click)="onTestGetHero()">Http Get Test Hero</button>
    <p>Output:{{heroData}}</p>
    <button (click)="onTestGetTimeObjByObservable()">Http Get Test Time OBJ By Observable</button>
    <p>Output: date = {{myObservableDateTime.date}}</p>
    <!--<p>Output: milliseconds_since_epoch = {{myObservableDateTime.milliseconds_since_epoch}}</p>-->
    <p>Output: time = {{myObservableDateTime.time}}</p>
    <button (click)="onTestGetTimeObjByPromise()">Http Get Test Time OBJ By Promise</button>
    <p>Output: date = {{myPromiseDateTime.date}}</p>
    <!--<p>Output: milliseconds_since_epoch = {{myPromiseDateTime.milliseconds_since_epoch}}</p>-->
    <p>Output: time = {{myPromiseDateTime.time}}</p>
    <button (click)="onTestGet()">Http Get Test </button>
    <p>Output:{{getData}}</p>
    <button (click)="onTestPost()">Http Post Test </button>
    <p>Output:{{postData}}</p>
  `,
  providers: [HTTPTestService]
})
export class HTTPTestComponent {
  errorMessage: string;
  getData: string;
  postData: string;
  heroData: string;

  myPromiseDateTime: MyDateTime = new MyDateTime();
  myObservableDateTime: MyDateTime = new MyDateTime();

  constructor(private _httpService: HTTPTestService) {

  }


  onTestGetHero() {
    this._httpService.getHero()
        .subscribe(
          data => this.heroData = JSON.stringify(data),
          error => alert(error),
          () => console.log('Finished')
        );
  }

  onTestGetTimeObjByObservable(): void {
    this._httpService.getCurrentTimeObjByObservable()
        .subscribe(
          res => this.myObservableDateTime = res,
          error => this.errorMessage = error
        );
  }


  onTestGetTimeObjByPromise(): void {
    this._httpService.getCurrentTimeObjByPromise()
        .then(res => this.myPromiseDateTime = res);
  }


  onTestGet() {
    this._httpService.getCurrentTime()
        .subscribe(
          data => this.getData = JSON.stringify(data),
          error => alert(error),
          () => console.log('Finished')
        );

  }


  onTestPost() {
    this._httpService.postJson()
        .subscribe(
          data => this.postData = JSON.stringify(data),
          error => alert(error),
          () => console.log('Finished')
        );
  }


}
