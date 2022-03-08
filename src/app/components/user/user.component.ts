import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Builder } from 'builder-pattern';
import { Mode } from 'src/app/model/mode-user'; 
import { User } from 'src/app/model/user';
import { PassingDataService } from 'src/app/services/passing-data.service';
import { Validator } from 'src/app/utils/validators';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user: User;
  mode: string = null;
  userForm: FormGroup;

  constructor(public fb: FormBuilder, private passingDataService: PassingDataService,  private router: Router, private activatedRoute: ActivatedRoute) { 

  }

  ngOnInit(): void {

    this.passingDataService.currentMode.subscribe(currentMode => {
     if (this.mode == null && currentMode === Mode.LOGIN){
        this.mode = Mode.LOGIN.toString();
        this.initLoginMode();
     } else if (this.mode == null && currentMode === Mode.EDIT){
        this.mode = Mode.EDIT.toString();
        this.initEditMode();
     } else if (this.mode == null && currentMode === Mode.REGISTER){
        this.mode = Mode.REGISTER.toString();
        this.validateUrlParameters();
        this.initRegisterMode();
     }
    });
    
  }

  submitFormLogin(){
    //If this metohd is invoked, that means that login form is validated
    var user = Builder(User).korisnickoIme(this.userForm.get('korisnickoIme').value).lozinka((this.userForm.get('lozinka').value)).build();
    alert("Login user on backend: " + JSON.stringify(user));
  }

  submitFormRegister(){
    //If this metohd is invoked, that means that register form is validated
    var user = Builder(User).korisnickoIme(this.userForm.get('korisnickoIme').value)
                            .lozinka((this.userForm.get('lozinka').value))
                            .email((this.userForm.get('email').value))
                            .build();
    alert("Register user on backend: " + JSON.stringify(user));
  }

  submitFormEdit(){

  }

  private initLoginMode(){
    this.userForm = this.fb.group({
      korisnickoIme: ['', [Validators.required, Validators.minLength(3)]],
      lozinka:       ['', [Validators.required, Validators.minLength(5)]]
    })
  }

  private initRegisterMode(){
    this.userForm = this.fb.group({
      korisnickoIme: ['', [Validators.required, Validators.minLength(3), Validator.cannotContainWhitespaceOnly]],
      lozinka:       ['', [Validators.required, Validators.minLength(5), Validator.cannotContainWhitespaceOnly]],
      email:         ['', [Validators.required, Validators.email]]
    })
  }

  private initEditMode(){
    this.userForm = this.fb.group({
      korisnickoIme: [this.user['korisnickoIme'], [Validators.required, Validators.minLength(3), Validator.cannotContainWhitespaceOnly]],
      lozinka:       [this.user['lozinka'], [Validators.required, Validators.minLength(5), Validator.cannotContainWhitespaceOnly]],
      email:         [this.user['email'], [Validators.required, Validators.email]]
    })
  }

  private validateUrlParameters(){
    
  }


}
