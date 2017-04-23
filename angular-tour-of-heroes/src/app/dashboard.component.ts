/**
 * Created by Cao on 2017/3/15.
 */
import { Component, OnInit } from '@angular/core';

import { Hero } from './hero';
import { HeroService } from './hero.service';

@Component({
  moduleId: module.id,
  selector: 'my-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  heroes: Hero[] = [];

  constructor(private heroService: HeroService) {
  }

  ngOnInit(): void {
    //this.heroService.getHeroes()
    //  .then(heroes => this.heroes = heroes.slice(1, 5));
    this.heroService.getHeroes()
        .subscribe(
          data => this.heroes = data.slice(0,4),
          error => alert(error),
          () => console.log('Finished')
        )
  }
}
