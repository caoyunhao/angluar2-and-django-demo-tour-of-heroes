import { Component, OnInit, Input }  from '@angular/core';
import { Router }             from '@angular/router';

import { Hero }         from './hero';
import { HeroService }  from './hero.service';


@Component({
  moduleId: module.id,
  selector: 'my-heroes',
  providers: [],
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  hero: Hero = new Hero();
  heroes: Hero[];
  selectedHero: Hero;

  constructor(private router: Router,
              private heroService: HeroService) {
  }

  getHeroes(): void {
    this.heroService.getHeroes()
        .subscribe(
          data => this.heroes = data,
          error => alert(error),
          () => console.log('get heroes Finished')
        )
    //this.heroService.getHeroes().then(heroes => this.heroes = heroes);
  }

  ngOnInit(): void {
    this.getHeroes();
    this.hero.id = 0;
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedHero.id]);
  }

  add(hero: Hero): void {
    hero.name = hero.name.trim();
    if (!hero.name) {
      return;
    }
    console.log('add hero begin');
    this.heroService.addHero(hero)
        .subscribe(
          hero => {
            this.heroes.push(hero);
            this.selectedHero = null;
          },
          error => alert(error),
          () => console.log('add hero finished')
        );
  }

  delete(hero: Hero): void {
    this.heroService
        .deleteHero(hero)
        .subscribe(
          data => {
            this.getHeroes();
            if (this.selectedHero === data) {
              this.selectedHero = null;
            }
          },
          error => alert(error),
          () => {
            console.log('delete Finished')
          });
  }
}
