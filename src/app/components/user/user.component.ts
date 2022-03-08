import { ThisReceiver } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { Mode } from 'src/app/model/mode-user'; 
import { PassingDataService } from 'src/app/services/passing-data.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  mode: string;

  constructor(private passingDataService: PassingDataService) { 

  }

  ngOnInit(): void {

    this.passingDataService.currentMode.subscribe(currentMode => {
     if (currentMode === Mode.LOGIN){
        this.mode = Mode.LOGIN.toString();
     } else if (currentMode === Mode.EDIT){
      this.mode = Mode.EDIT.toString();
     } else if (currentMode === Mode.REGISTER){
      this.mode = Mode.REGISTER.toString();
     }
    });
    
  }

}
