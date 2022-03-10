import { Component, OnInit } from '@angular/core';
import { Builder } from 'builder-pattern';
import { Course } from 'src/app/model/course';
import { PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormControl } from '@angular/forms';
import { Observable, pipe } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FirebaseService } from 'src/app/services/firebase-service.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']

})
export class CoursesComponent implements OnInit {

  public coursesRepo: Course[] = [];
  courses$: Observable<Course[]>;
  filter = new FormControl('');

  constructor(private firebaseService:  FirebaseService) {
   
  }

  private search(text: string): Course[] {
    return this.coursesRepo.filter(course => {
      const term = text.toLowerCase();
      return course['naziv'].toLowerCase().includes(term)
          || course['autor'].toLowerCase().includes(term)
          || course['kategorija'].toLowerCase().includes(term);
    });
  }

  

  ngOnInit(): void {
    //todo service call
    //this.coursesRepo =
    
    this.firebaseService.getAllCourses().subscribe(courses => {
      
     this.coursesRepo = courses;
      
      //[ Builder(User).id("1").korisnickoIme("pera").lozinka("123").email("pera@gmail.com").ime("Petar").prezime("Petrovic").datumRodjenja("2022-12-12").adresa("asfa").telefon("afs00").build()]
    

      this.courses$ = this.filter.valueChanges.pipe(
        startWith(''),
        map(text => this.search(text))
      );
    })
    
   
    //[Builder(Course).id("1").naziv("matematika 1").autor("autorsss").kategorija("WEB").build(), Builder(Course).autor("autorsss").kategorija("BAZE").id("1").autor("autorsss").kategorija("ALGO").naziv("ASFASF").build(),
    //Builder(Course).id("1").naziv("ASFASFGGG").autor("autorsss").kategorija("SRPSKI").build(), Builder(Course).id("1").autor("autorsss").kategorija("MAT").naziv("ASFASF").build(), Builder(Course).id("1").autor("autorsss").kategorija("XMML").naziv("ASFASF").build()]
    
  }


}


