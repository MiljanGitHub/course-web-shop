import { Component, OnInit, Pipe } from '@angular/core';
import { PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormControl } from '@angular/forms';
import { Observable, pipe } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { User } from 'src/app/model/user';
import { Builder } from 'builder-pattern';
import { PassingDataService } from 'src/app/services/passing-data.service';
import { Mode } from 'src/app/model/mode-user'; 




@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  public usersRepo: User[] = [];
  users$: Observable<User[]>;
  filter = new FormControl('');

  constructor(private passingDataService: PassingDataService) { 
    this.users$ = this.filter.valueChanges.pipe(
      startWith(''),
      map(text => this.search(text))
    );
  }

  ngOnInit(): void {
    //todo service call
    this.usersRepo = [Builder(User).id(1).korisnickoIme("pera").email("pera@gmail.com").ime("Petar").prezime("Petrovic").build()]

  }

  private search(text: string): User[] {
    return this.usersRepo.filter(user => {
      const term = text.toLowerCase();
      return user['korisnickoIme'].toLowerCase().includes(term)
          || user['email'].toLowerCase().includes(term)
          || user['ime'].toLowerCase().includes(term)
          || user['prezime'].toLowerCase().includes(term);
    });
  }


  setUserComponentMode(){
    this.passingDataService.changeMode(Mode.EDIT);
  }

}
