import { Injectable } from '@angular/core';
import { Builder } from 'builder-pattern';
import { Course } from '../model/course';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor() { }

  public getCourseById(courseId : number) : Course{
    return  Builder(Course).id(1)
    .naziv("matematika 1")
    .autor("")
    .opis("opissss")
    .slika("https://i.imgur.com/IfoRpDP.png")
    .brojKorisnika(32)
    .brojLekcija(15)
    .kategorija("aaa")
    .prosecnaOcena(3.2)
    .cena(3200)
    .jezik("Engleski")
    .datumIzmene("2021-04-15")
    .sertifikovan(true)
    .build();
  }

  public getUserById(userId : number) : User{
    return Builder(User).id(1).korisnickoIme("pera").lozinka("123").email("pera@gmail.com").ime("Petar").prezime("Petrovic").datumRodjenja("2022-12-12").adresa("asfa").telefon("afs00").build();

  }

  public  deactivateUser(userId: Number){

  }

  public  deactivateCourse(courseId: Number){

  }
}