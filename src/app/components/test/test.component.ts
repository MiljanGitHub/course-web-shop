import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Builder } from 'builder-pattern';
import { map } from 'rxjs';
import { User } from 'src/app/model/user';
import { FirebaseService } from 'src/app/services/firebase-service.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  testStr : "aaa";
  testInt : 212;
  userRepo: User[] = [];
  myForm: FormGroup;
  categoryExist: boolean;
  categories: String[] = ['Florida', 'South Dakota', 'Tennessee', 'Michigan'];
  constructor(public fb: FormBuilder, afDb: AngularFireDatabase, private fireBase : FirebaseService) { 

    this.fireBase.getAllCourses().subscribe(courses => {
     console.log(courses)
     
    })
    // //update
    // var x = Builder(User).korisnickoIme("pera").lozinka("123").email("pera@gmail.com").ime("Petar").prezime("Petrovic").datumRodjenja("2022-12-12").adresa("asfa").telefon("afs00").build();

    // const tutorialsRef = afDb.list('/korisnici');
    // tutorialsRef.update('-MNQoCqEXydVTdCNV47C', x).then(() => {
    //   console.log("aaaafff");
    // }).catch(error => {
    //                 console.log(error);
    //                 let errMsg: string = "Error! Details: " + error;
    //                 console.log("msg: " + errMsg)
                   
    //               });
    // console.log("adaf");
    // this.retrieveTutorials();



    // this.fireBase.getAllCourses().subscribe(x => {
    //   console.log(x)
    // })
    //afDb.database().re

  
        
        // this.fireBase.deleteUser("MNQo55Aw0tLdwahMZMK")
        //           .then(() => {
        //             // remove a deletedCustomer from customers list on view
                    
  
                
        //           })
        //           .catch(error => {
        //             console.log(error);
        //             let errMsg: string = "Error! Details: " + error;
        //             console.log("msg: " + errMsg)
        //            // this.messageService.add(errMsg);
        //           });
    
  

    // this.fireBase.getAllUsers().subscribe(usersEntity => {

  
    // });

  }
  public test(){

    this.retrieveTutorials();

  }
  retrieveTutorials(): void {
    this.fireBase.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
     console.log("dataa: " + JSON.stringify(data))
    });
  }

  ngOnInit(): void {
    this.reactiveForm()
    // this.fireBase.getUserById("MNQo55Aw0tLdwahMZMK").subscribe(c => {
    //   console.log(c);
    // })
  }

  reactiveForm() {
    var x  = 'Programiranje'
    this.myForm = this.fb.group({
      //id: ['asf', [Validators.required]],
      name: ['asdas', [Validators.required, Validators.minLength(2)]],
     // opis: [x,[Validators.required, Validators.minLength(10)]],
      kategorija: [x,[Validators.required]]
    })
  }


  /* Handle form errors in Angular 8 */
  public errorHandling = (control: string, error: string) => {
    console.log("iz errorHandling: " + control + " " + error) //name required
    console.log(this.myForm.controls[control].hasError(error))
    return this.myForm.controls[control].hasError(error);
  }

  submitForm() {
    console.log(this.myForm.value)
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
}


/* DELETE RADI!!!!


    afDb.object("korisnici/-MNQo55Aw0tLdwahMZMK")  .remove() //"MNQo55Aw0tLdwahMZMK")

    .then(() => {
      //this.refreshList.emit();
     // this.message = 'The tutorial was updated successfully!';
     console.log("dosao")
    })
    .catch(err => console.log(err));
*/