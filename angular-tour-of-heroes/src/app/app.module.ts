import { BrowserModule }  from '@angular/platform-browser';
import { NgModule }       from '@angular/core';
import { FormsModule }    from '@angular/forms';
import { HttpModule }     from '@angular/http';

import { AppComponent }         from './app.component';
import { HeroDetailComponent }  from './hero-detail.component';
import { HeroesComponent }      from './heroes.component';
import { HeroService }          from './hero.service';
import { DashboardComponent }   from './dashboard.component'

import { AppRoutingModule }     from './app-routing.module';
import { HeroSearchComponent }  from './hero-search.component'
import { HTTPTestComponent } from "./test/http-test.component";
import { HTTPTestService } from "./test/http-test.service";


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    //InMemoryWebApiModule.forRoot(InMemoryDataService),
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    HeroDetailComponent,
    HeroesComponent,
    HeroSearchComponent,
    HTTPTestComponent
  ],
  providers: [
    HeroService,
    HTTPTestService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


