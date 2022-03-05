import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from "@angular/common";
import { Course } from 'src/app/model/course';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase-service.service';
import { NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  public course!: Course;
  model: NgbDateStruct;
  date: {year: number, month: number};
  
  constructor( private activatedRoute: ActivatedRoute, private location: Location, private firebaseService : FirebaseService, private calendar: NgbCalendar) { 

  }

  selectToday() {
    this.model = this.calendar.getToday();
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      var courseId = params.get('courseIdPlaceholder');
      var courseName = params.get('courseNamePlaceholder')
      
      //some custom validation and simple checks...

      //check if 'courseId' is valid value
      if (courseId && courseName) {
        console.log("aaaaa")
        //check if 'courseId' is an integer value
        var isInt = /^\+?\d+$/.test(courseId);
        if (!isInt){
          //if courseId' is not an integer value, redirect to 'courses' page
          alert("Nije celobrojna vrednost. Bicete redirected!")
          this.location.replaceState("/courses");
        }

        //check in service layer if Course exists for given Id
        this.course = this.firebaseService.getById(Number(courseId));
        if (!(this.course instanceof Course)){
          alert("Ne postoji dostupan course pod prosledjenom vrednoscu")
          this.location.replaceState("/courses");
        }

        //check if 'courseName' matches passed 'courseId'
        if (this.course.naziv != courseName){
          alert("Prosledjeni kurs se ne poklapa sa imenom")
          this.location.replaceState("/courses");
        }
      } else {
        alert("Morate poslati validne vredosti za course i id. Bicete redirected!")
        this.location.replaceState("/courses");
      }
    });
  }

  

}