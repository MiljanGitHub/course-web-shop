import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Builder } from 'builder-pattern';
import { Course } from 'src/app/model/course';
import { FirebaseService } from 'src/app/services/firebase-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public coursesToDisplay: Course[][] = [];
  public courses: Course[] = [];
  constructor(private firebaseService : FirebaseService,  private router: Router) {

    //this.courses = [Builder(Course).id(1).naziv("ASFASF").opis("opissss").build(), Builder(Course).opis("opissss").id(1).opis("opissss").naziv("ASFASF").build(),
    //Builder(Course).id(1).naziv("ASFASF").opis("opissss").build(), Builder(Course).id(1).opis("opissss").naziv("ASFASF").build(), Builder(Course).id(1).opis("opissss").naziv("ASFASF").build()]
    //this.coursesToDisplay = this.chunkArray(this.courses, 3);
   }

  ngOnInit(): void {
    this.firebaseService.getAllCourses().subscribe(courses => {
      this.courses = courses;
      this.coursesToDisplay = this.chunkArray(this.courses, 3);
    })
  }


  chunkArray(myArray : Course[], chunk_size: number){
    var index = 0;
    var arrayLength = myArray.length;
    var tempArray = [];
    var myChunk = [];
    
    for (index = 0; index < arrayLength; index += chunk_size) {
        myChunk = myArray.slice(index, index+chunk_size);
        tempArray.push(myChunk);
    }

    return tempArray;

  }

}
