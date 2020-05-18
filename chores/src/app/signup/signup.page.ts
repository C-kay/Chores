import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {  Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  signUpForm:FormGroup;
  
  password:string;
  cpassword:string;

  showToolBar:boolean;

  constructor(private router:Router, public auth:AuthService) {

    this.signUpForm = new FormGroup({
      name : new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z]*'), Validators.maxLength(10), Validators.minLength(4)]),
      number : new FormControl('', [Validators.required, Validators.pattern('[0-9]*'), Validators.maxLength(15), Validators.minLength(4)]),
      email: new FormControl('', [Validators.required, Validators.pattern('^([a-zA-Z0-9_.+-]+)@([a-zA-Z0-9-]+)\.([a-zA-Z0-9-.]+)$')]),
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]),
      cpassword: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]),
    });

    this.showToolBar = false;
  }

  ngOnInit() {
  }


  signUp(){
    console.log(this.signUpForm.value);

    if(this.cpassword == this.password){
      
      this.auth.emailSignUp(this.signUpForm.value.email, this.signUpForm.value.password)
      this.router.navigate(['login']);
    }
  }

  //Use this method with ion-conent set to [scrollEvents]="true" (ionScroll)="onScroll($event)" and tool-bar set to [hidden]=showToolBar
  // onScroll(event) {
  //   if (event.detail.deltaY > 0 && this.showToolBar) return;
  //   if (event.detail.deltaY < 0 && !this.showToolBar) return;
  //   if (event.detail.deltaY > 0) {
  //     console.log("scrolling down, hiding footer...");
  //     this.showToolBar = true;
  //   } else {
  //     console.log("scrolling up, revealing footer...");
  //   }
  // }
  

  validName(){
    return ((this.signUpForm.get('name').hasError('pattern') || this.signUpForm.get('name').hasError('minlength') || this.signUpForm.get('name').hasError('maxlength') || this.signUpForm.get('name').hasError('required') )&& this.signUpForm.get('name').touched);
  }

  validNumber(){
    return ((this.signUpForm.get('number').hasError('pattern') || this.signUpForm.get('number').hasError('minlength') || this.signUpForm.get('number').hasError('maxlength') || this.signUpForm.get('number').hasError('required') )&& this.signUpForm.get('number').touched);
  }

  validEmail(){
    return (this.signUpForm.get('email').hasError('pattern') || this.signUpForm.get('email').hasError('required')) && this.signUpForm.get('email').touched;
  }

  validPassword(){
    return (( this.signUpForm.get('password').hasError('pattern') || this.signUpForm.get('password').hasError('minlength') || this.signUpForm.get('password').hasError('maxlength') || this.signUpForm.get('password').hasError('required') )&& this.signUpForm.get('password').touched);
  }
  
  validCPassword(){
    return (( this.signUpForm.get('cpassword').hasError('pattern') || this.signUpForm.get('cpassword').hasError('minlength') || this.signUpForm.get('cpassword').hasError('maxlength') || this.signUpForm.get('cpassword').hasError('required') )&& this.signUpForm.get('cpassword').touched);
  }

}
