import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from "@angular/common";
import { Course } from 'src/app/model/course';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase-service.service';
import { NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Builder } from 'builder-pattern';
import { Validator } from 'src/app/utils/validators';


@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  categoryExist: boolean;
  course!: Course;
  model: NgbDateStruct;
  date: {year: number, month: number};
  myForm: FormGroup;
  categories: String[] = ['Web programiranje', 'Objektno programiranje', 'Algoritmi', 'Strukture podataka', 'Baze podataka'];
  constructor(public fb: FormBuilder, private activatedRoute: ActivatedRoute, private location: Location, private firebaseService : FirebaseService, private calendar: NgbCalendar) { 

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
 
        //check if 'courseId' is an integer value
        var isInt = /^\+?\d+$/.test(courseId);
        if (!isInt){
          //if courseId' is not an integer value, redirect to 'courses' page
          alert("Nije celobrojna vrednost. Bicete redirected!")
          //todo
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

        //if everyting is ok
       // this.initReactiveForm();         

      } else {
        alert("Morate poslati validne vredosti za course i id. Bicete redirected!")
        this.location.replaceState("/courses");
      }

      this.course = Builder(Course).id(1)
                                   .naziv("a")
                                   .autor("")
                                   .opis("opissss")
                                   .slika("https://i.imgur.com/IfoRpDP.png")
                                   .brojKorisnika(32)
                                   .brojLekcija(15)
                                   .kategorija("Programiranje")
                                   .prosecnaOcena(3.2)
                                   .cena(3200)
                                   .jezik("Engleski")
                                   .datumIzmene("2021-04-15")
                                   .sertifikovan(true)
                                   .build()
             this.checkCategory(this.course['kategorija'])                      
             this.initReactiveForm();            
     
    });
    
  }

  initReactiveForm() {
        
    this.myForm = this.fb.group({
      naziv:      [this.course['naziv'],     [Validators.required, Validators.minLength(3),  Validator.cannotContainWhitespaceOnly]],
      autor:      [this.course['autor'],     [Validators.required, Validators.minLength(5),  Validator.cannotContainWhitespaceOnly]],
      opis:       [this.course['opis'],      [Validators.required, Validators.minLength(10), Validator.cannotContainWhitespaceOnly]],
      kategorija: [this.course['kategorija'],[Validator.isUncategorized]]
    })
  }

  checkCategory(kategorija : string){
    if (kategorija === null || kategorija.match(/^ *$/) !== null){
      this.categoryExist = false;
      return;
    }
    if (!this.categories.includes(kategorija)){
      this.categories.push(kategorija);
    }
    this.categoryExist = true;
  }

  submitForm() {
    console.log(this.myForm.value)
    console.log(this.course)
  }

  

}