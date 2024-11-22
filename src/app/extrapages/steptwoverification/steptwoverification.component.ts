import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgOtpInputModule } from 'ng-otp-input';

@Component({
  selector: 'app-steptwoverification',
  templateUrl: './steptwoverification.component.html',
  styleUrls: ['./steptwoverification.component.scss'],
  standalone:true,
  imports:[NgOtpInputModule,RouterModule],
})
export class SteptwoverificationComponent {

  constructor() { }
  config: any = {
    allowNumbersOnly: true,
    length: 4,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: {
      'width': '80px',
      'height': '50px'
    }
  };
  ngAfterViewInit(){
    document.body.classList.remove('auth-body-bg')
  }
  // set the currenr year
  year: number = new Date().getFullYear();
}
