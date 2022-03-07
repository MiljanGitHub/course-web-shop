import { Component, OnInit, Pipe } from '@angular/core';
import { PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormControl } from '@angular/forms';
import { Observable, pipe } from 'rxjs';
import { map, startWith } from 'rxjs/operators';


const COUNTRIES: Country[] = [
  {
    name: 'Russia',
    flag: 'f/f3/Flag_of_Russia.svg',
    area: "17075200",
    population: "146989754"
  },
  {
    name: 'Canada',
    flag: 'c/cf/Flag_of_Canada.svg',
    area: "9976140",
    population: "36624199"
  },
  {
    name: 'United States',
    flag: 'a/a4/Flag_of_the_United_States.svg',
    area: "9629091",
    population: "324459463"
  },
  {
    name: 'China',
    flag: 'f/fa/Flag_of_the_People%27s_Republic_of_China.svg',
    area: "9596960",
    population: "1409517397"
  }
];

interface Country {
  name: string;
  flag: string;
  area: string;
  population: string;
}

function search(text: string, pipe: PipeTransform): Country[] {
  return COUNTRIES.filter(country => {
    const term = text.toLowerCase();
    return country.name.toLowerCase().includes(term)
        || pipe.transform(country.area).includes(term)
        || pipe.transform(country.population).includes(term);
  });
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [DecimalPipe]
})
export class UsersComponent implements OnInit {

  countries$: Observable<Country[]>;
  filter = new FormControl('');

  constructor(pipe: DecimalPipe) { 
    this.countries$ = this.filter.valueChanges.pipe(
      startWith(''),
      map(text => search(text,pipe))
    );
  }

  ngOnInit(): void {
  }

}
