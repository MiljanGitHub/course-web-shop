import { Component, OnInit } from '@angular/core';
import { Builder } from 'builder-pattern';
import { Course } from 'src/app/model/course';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  public coursesToDisplay: Course[][] = [];
  public courses: Course[] = [];
  constructor() {
    this.courses = [Builder(Course).id(1).naziv("ASFASF").opis("opissss").build(), Builder(Course).opis("opissss").id(1).opis("opissss").naziv("ASFASF").build(),
    Builder(Course).id(1).naziv("ASFASF").opis("opissss").build(), Builder(Course).id(1).opis("opissss").naziv("ASFASF").build(), Builder(Course).id(1).opis("opissss").naziv("ASFASF").build()]
    this.coursesToDisplay = this.chunkArray(this.courses, 3);
   }

  ngOnInit(): void {
  }

  test(course : Course){
    console.log(course)
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