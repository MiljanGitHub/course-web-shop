import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Builder } from 'builder-pattern';
import { Observable } from 'rxjs';
import { Course } from '../model/course';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  usersRef: AngularFireList<User> = null;

  constructor(private afDb: AngularFireDatabase) { 
    this.usersRef = afDb.list("/korisnici");
    console.log("iz konstruktora servisa: " + JSON.stringify(this.usersRef))
  }

  getAll(): AngularFireList<User> {
    return this.afDb.list("/korisnici");;
  }

  public deleteUser(key: string): Promise<void> {
    return this.usersRef.remove(key);
  }

  public getAllCourses() : Observable<Course[]>{
    return this.afDb.list<Course>('kursevi').valueChanges();
   
  }

  public getAllUsers() : Observable<any[]>{
    return this.afDb.object<any>('korisnici').valueChanges();
   
  }

  public getCourseById(courseId : number) : Observable<Course>{
    return this.afDb.object<Course>('kursevi' + "/" + courseId ).valueChanges();
  }

  public getUserById(userId : string) : Observable<any>{
   return this.afDb.object<any>('korisnici/'+userId).valueChanges();
  }

  public updateUser(user : User) : Promise<void>{
    return this.afDb.list('/korisnici').update(user['key'], user);
  }



  public deactivateUser(userId: string): Promise<void> {
    return this.afDb.object("korisnici/" + userId).remove()
  }

  public  deactivateCourse(courseId: string){
    return this.afDb.object("kursevi/" + courseId).remove()
  }

}