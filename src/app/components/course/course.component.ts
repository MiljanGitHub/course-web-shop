import { OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  myForm: FormGroup;
  courseHasBeenDeleted = false;
  categories: String[] = ['Web programiranje', 'Objektno programiranje', 'Algoritmi', 'Strukture podataka', 'Baze podataka'];
  
  constructor(public fb: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute, private location: Location, private firebaseService : FirebaseService, private calendar: NgbCalendar) { 
   

  }




  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe(params => {
      var courseId = params.get('courseIdPlaceholder');

      //check if 'courseId' is valid value
      if (courseId) {
        console.log(this.courseHasBeenDeleted)
        //check in service layer if Course exists for given Id
        this.firebaseService.getAllCourses().subscribe(courses => {
          var c = courses.find(course => {
            return course['id'].toString() === courseId.toString();
          });

          this.course = c;
          if (this.courseHasBeenDeleted){
            alert("Course is deactivated. You will be redirecated to home page!")
            this.router.navigate(["/home"]);
            return;
          }
          this.checkCategory(this.course['kategorija'])
          this.initReactiveForm();

        });
        

      } else {
        alert("Morate poslati validnu vredost za identifikator kursa. Bicete preusmerenui!")
        this.router.navigate(["/home"]);
        return;
      }

    });
    
  }

  

  initReactiveForm() {
        
    this.myForm = this.fb.group({
      naziv:        [this.course['naziv'],         [Validators.required, Validators.minLength(3),  Validator.cannotContainWhitespaceOnly]],
      autor:        [this.course['autor'],         [Validators.required, Validators.minLength(5),  Validator.cannotContainWhitespaceOnly]],
      opis:         [this.course['opis'],          [Validators.required, Validators.minLength(10), Validator.cannotContainWhitespaceOnly]],
      kategorija:   [this.course['kategorija'],    [Validators.required, Validator.isUncategorized]],
      cena:         [this.course['cena'],          [Validators.required, Validators.min(0)]],
      jezik:        [this.course['jezik'],         [Validators.required, Validators.minLength(3)]],
      datumIzmene:  [this.initFormControleValue(), [Validators.required, Validator.invalidDate]],
      sertifikovan: [this.course['sertifikovan'],  []]
    })

  }

  initFormControleValue() : any{
    var year = this.initYear(this.course['datumIzmene']);
    var month = this.initMonth(this.course['datumIzmene'])
    var day = this.initDay(this.course['datumIzmene'])
    return {year: year,month: month, day: day };
  }

  checkCategory(kategorija : string){
    if (Validator.isEmptySpaceOrWhiteSpace(kategorija)){
      this.categoryExist = false;
      return;
    }
    if (!this.categories.includes(kategorija)){
      this.categories.push(kategorija);
    }
    this.categoryExist = true;
  }



  submitForm() {
    //if this function is called, then form must be valid!
    console.log("teeeest")
    console.log(this.myForm.value)
    console.log(this.course)
  }

  deactivate(){
    var courseId = this.course['id'];
    this.courseHasBeenDeleted = true;
    this.course = Builder(Course).id("-1").build();
    this.firebaseService.deactivateCourse(courseId);
    
   
  }

  private initYear(datumIzmene : string) : number{
    return Number(datumIzmene.substring(0,4))
  }

  private initMonth(datumIzmene : string) : number{
    var twoDigitsNumber = datumIzmene.substring(5,7);
    if (twoDigitsNumber.charAt(0) === '0') return Number(twoDigitsNumber.charAt(1));
    return Number(twoDigitsNumber.charAt(0)+twoDigitsNumber.charAt(1))
  }
  
  private initDay(datumIzmene : string) : number{
    var twoDigitsNumber = datumIzmene.substring(8,10);
    if (twoDigitsNumber.charAt(0) === '0') return Number(twoDigitsNumber.charAt(1));
    return Number(twoDigitsNumber.charAt(0)+twoDigitsNumber.charAt(1))
  }


  

}