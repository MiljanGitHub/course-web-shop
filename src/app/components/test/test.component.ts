import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  myForm: FormGroup;
  categoryExist: boolean;
  categories: String[] = ['Florida', 'South Dakota', 'Tennessee', 'Michigan'];
  constructor(public fb: FormBuilder) { }

  ngOnInit(): void {
    this.reactiveForm()
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
