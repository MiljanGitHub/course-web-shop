import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Builder } from 'builder-pattern';
import { Mode } from 'src/app/model/mode-user'; 
import { User } from 'src/app/model/user';
import { FirebaseService } from 'src/app/services/firebase-service.service';
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

  constructor(private firebaseService : FirebaseService, public fb: FormBuilder, private passingDataService: PassingDataService,  private router: Router, private activatedRoute: ActivatedRoute) { 

  }

  ngOnInit(): void {

    this.passingDataService.currentMode.subscribe(currentMode => {
     if (this.mode == null && currentMode === Mode.LOGIN){
        this.mode = Mode.LOGIN.toString();
        this.initLoginMode();
     } else if (this.mode == null && currentMode === Mode.EDIT){
        this.mode = Mode.EDIT.toString();
        this.validateUrlParameters();
        this.initEditMode();
     } else if (this.mode == null && currentMode === Mode.REGISTER){
      
        this.mode = Mode.REGISTER.toString();
        
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
    //If this metohd is invoked, that means that edit form is validated
    this.user.korisnickoIme = this.userForm.get('korisnickoIme').value;
    this.user.email = this.userForm.get('email').value;
    this.user.ime = this.userForm.get('ime').value;
    this.user.prezime = this.userForm.get('prezime').value;
    this.user.lozinka = this.userForm.get('lozinka').value;
    this.user.lozinka = this.userForm.get('lozinka').value;
    this.user.telefon = this.userForm.get('telefon').value;
    this.user.datumRodjenja = this.userForm.get('datumRodjenja').value;
    alert("Edit user on backend: " + JSON.stringify(this.user));
  }

  deactivateUser(){
    var userId = this.user['id'];
    this.firebaseService.deactivateUser(userId);
    alert("User is deactivated. You will be redirecated to home page!")
    this.router.navigate(["/home"]);
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
      korisnickoIme: [this.user['korisnickoIme'],    [ Validators.required,     Validators.minLength(3), Validator.cannotContainWhitespaceOnly]],
      lozinka:       [this.user['lozinka'],          [ Validators.required,     Validators.minLength(5), Validator.cannotContainWhitespaceOnly]],
      email:         [this.user['email'],            [ Validators.required,     Validators.email]],
      ime:           [this.user['ime'],              [ Validators.minLength(5), Validator.cannotContainWhitespaceOnly]],
      prezime:       [this.user['prezime'],          [ Validators.minLength(5), Validator.cannotContainWhitespaceOnly]],
      adresa:        [this.user['adresa'],           [ Validators.minLength(5), Validator.cannotContainWhitespaceOnly]],
      telefon:       [this.user['telefon'],          [ Validators.minLength(7), Validator.cannotContainWhitespaceOnly]],
      datumRodjenja: [this.initFormControleValue(),  [                          Validator.invalidDate]]
    })
  }

  private validateUrlParameters(){
  this.activatedRoute.paramMap.subscribe(params => {
      var userId = params.get('userIdPlaceholder');
      var username = params.get('usernamePlaceholder')

      if (userId && username) {
 
        //check if 'userId' is an integer value
        var isInt = Validator.isIntegerValue(userId);
        if (!isInt){
          //if 'userId' is not an integer value, redirect to 'users' page
          alert("Jedinstveni identifikator korisnika nije celobrojna vrednost. Bicete preusmereni!")
          this.router.navigate(["/users"]);
        }

        //check in service layer if User exists for given Id
        this.user = this.firebaseService.getUserById(Number(userId));
        if (!(this.user instanceof User) || this.user['id'].toString() != userId){
          alert("Ne postoji korisnik sa identifikatorom: " + userId + "\n" +  "Bicete preusmerenui")
          this.router.navigate(["/users"]);
        }

        //check if 'username' matches passed 'userId'
        if (this.user.korisnickoIme != username){
          alert("Ime trazenog korisnika se ne podudara sa imenom korisnika iz baze podataka za prosledjeni identifikator! Bicete preusmerenui")
          this.router.navigate(["/users"]);
        }     

      } else {
        alert("Morate poslati validne vredosti za identifikator i ime korisnika. Bicete preusmerenui!")
        this.router.navigate(["/users"]);
      }

    });
  }

  initFormControleValue() : any{
    var year = this.initYear(this.user['datumRodjenja']);
    var month = this.initMonth(this.user['datumRodjenja'])
    var day = this.initDay(this.user['datumRodjenja'])
    return {year: year,month: month, day: day };
  }

  private initYear(datumRodjenja : string) : number{
    return Number(datumRodjenja.substring(0,4))
  }

  private initMonth(datumRodjenja : string) : number{
    var twoDigitsNumber = datumRodjenja.substring(5,7);
    if (twoDigitsNumber.charAt(0) === '0') return Number(twoDigitsNumber.charAt(1));
    return Number(twoDigitsNumber.charAt(0)+twoDigitsNumber.charAt(1))
  }
  
  private initDay(datumRodjenja : string) : number{
    var twoDigitsNumber = datumRodjenja.substring(8,10);
    if (twoDigitsNumber.charAt(0) === '0') return Number(twoDigitsNumber.charAt(1));
    return Number(twoDigitsNumber.charAt(0)+twoDigitsNumber.charAt(1))
  }


}
