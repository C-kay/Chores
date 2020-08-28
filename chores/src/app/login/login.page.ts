import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {  Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import {AuthService} from '../services/auth.service';
import {AngularFireAuth} from '@angular/fire/auth';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {

  loginForm:FormGroup;

  user ={};

  constructor(private router:Router, public auth:AuthService, private afAuth:AngularFireAuth) { 

    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern('^([a-zA-Z0-9_.+-]+)@([a-zA-Z0-9-]+)\.([a-zA-Z0-9-.]+)$')]),
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]),
    });

    
  }

  ngOnInit() {
    this.auth.sidemenu=true;
  }

  ionViewDidEnter(){
    this.auth.sidemenu=true;
  }

  login(){
    console.log(this.loginForm.value);

    //this.route.navigate(['home']);
  }

  async signInWithGoogle(){
    
    await this.auth.googleSignIn();
    console.log(this.loginForm.value);

    if(!!this.auth.user$){
      this.router.navigate(['home']);
    }else{
      console.warn("User cannot be logged in");
    }
    
  }

  async signInWithEmail(){
    
    await this.auth.emailSignIn(this.loginForm.value.email, this.loginForm.value.password);
    
    // this.auth.user$.pipe(first()).toPromise().then((user)=>{
    //   console.log("from login: " + user);
    // });

    if(this.afAuth.currentUser){;
      this.router.navigate(['home']);
    }else{
      console.warn("User cannot be logged in");
    }
    
  }


  singUp(){
    this.router.navigate(['signup']);
  }



  validEmail(){
    return (this.loginForm.get('email').hasError('pattern') || this.loginForm.get('email').hasError('required')) && this.loginForm.get('email').touched;
  }

  validPassword(){
    return (( this.loginForm.get('password').hasError('pattern') || this.loginForm.get('password').hasError('minlength') || this.loginForm.get('password').hasError('maxlength') || this.loginForm.get('password').hasError('required') )&& this.loginForm.get('password').touched);
  }

  forgotPassword(){
    
  }

}
