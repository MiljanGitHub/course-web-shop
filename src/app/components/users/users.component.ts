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
import { FirebaseService } from 'src/app/services/firebase-service.service';




@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  public usersRepo: User[] = [];
  users$: Observable<User[]>;
  filter = new FormControl('');

  constructor(private passingDataService: PassingDataService, private firebaseService:  FirebaseService) { 

    
  }

  ngOnInit(): void {
    //service call
    
    this.firebaseService.getAllUsers().subscribe(usersEntity => {
      if (usersEntity === null || usersEntity === undefined || usersEntity.length === 0) return;
      const keys = Object.keys(usersEntity);
     // this.usersRepo = 
      
      //[ Builder(User).id("1").korisnickoIme("pera").lozinka("123").email("pera@gmail.com").ime("Petar").prezime("Petrovic").datumRodjenja("2022-12-12").adresa("asfa").telefon("afs00").build()]
    
      keys.forEach(key => {
        var user = Builder(User).key(key)
                                //.id(usersEntity[key]['id'])
          	                    .korisnickoIme(usersEntity[key]['korisnickoIme'])
                                .lozinka(usersEntity[key]['lozinka'])
                                .email(usersEntity[key]['email'])
                                .ime(usersEntity[key]['ime'])
                                .prezime(usersEntity[key]['prezime'])
                                .datumRodjenja(usersEntity[key]['datumRodjenja'])
                                .adresa(usersEntity[key]['adresa'])
                                .telefon(usersEntity[key]['korisnickoIme'])
                                .build();

                                console.log(user)
                                
        this.usersRepo.push(user);

        
    })
    //search
    this.users$ = this.filter.valueChanges.pipe(
      startWith(''),
      map(text => this.search(text))
    );
  })
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
