import { Injectable } from '@angular/core';
import { Builder } from 'builder-pattern';
import { Course } from '../model/course';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor() { }

  public getById(courseId : number) : Course{
    return Builder(Course).id(1).naziv("ASFASF").build();
  }
}