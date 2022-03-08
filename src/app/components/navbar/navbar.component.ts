import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Mode } from 'src/app/model/mode-user';
import { PassingDataService } from 'src/app/services/passing-data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  closeResult = '';
  
  constructor(private modalService: NgbModal, private passingDataService: PassingDataService) { }

  ngOnInit(): void {
  }

  openUserComponentInLoginMode(content) {

    //inform UserComponent about opening Mode
    this.passingDataService.changeMode(Mode.LOGIN);

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title-login'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openUserComponentInRegisterMode(content) {

    //inform UserComponent about opening Mode
    this.passingDataService.changeMode(Mode.REGISTER);

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title-register'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
