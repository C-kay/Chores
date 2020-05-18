import { Injectable } from '@angular/core';
import {Router} from '@angular/router';

//import { firebase } from '@firebase/app';
import {auth} from 'firebase/app';  import 'firebase/auth';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import {Observable, of} from 'rxjs';
import {switchMap} from 'rxjs/operators';

import {User} from './user.model';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //current google user object 
  user$: Observable<User>; //$ to indicate observable
  private data:any ;
  
  //turn sidemenu on and off
  sidemenu: boolean = false;
  
  
  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore, private router: Router) {
    //google sign in
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user =>{
        if(user){
          return this.afs.doc<User>(`Users/${user.uid}`).valueChanges();
        }else{
          return of(null);
        }
      })
    );
  }

///////////////////GOOGLE////////////////////////////////////////////
  //sign in with google and pass user credentials
  async googleSignIn(){
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.signInWithPopup(provider);
    return this.updateUserData(credential.user);
  }

  //signout with google
  async googleSignOut(){
    await this.afAuth.signOut();
  }
///////////////////FACEBOOK////////////////////////////////////////////
  //sign in with facebook and pass user credentials
  async faceBookSignIn(){
    const provider = new auth.FacebookAuthProvider();
    const credential = await this.afAuth.signInWithPopup(provider);
    return this.updateUserData(credential.user);
  }


///////////////////EMAIL////////////////////////////////////////////
  
  //sign in with email and pass user credentials
  async emailSignUp(email:string, password:string){
  const credential = await this.afAuth.createUserWithEmailAndPassword(email, password);
  return this.updateUserData(credential.user);
  }
  
  //sign in with email and pass user credentials
  async emailSignIn(email:string, password:string){
    try{
      const credential = await this.afAuth.signInWithEmailAndPassword(email, password);
      this.updateUserData(credential.user);
    }catch(err){
      console.dir(err);
    }

    console.log("Current User: ");
    console.log((await this.afAuth.currentUser).email);
  }

  //signout with email
  async emailSignOut(){
    await this.afAuth.signOut();
  }


///////////////////////////////////////////////////////////////
  //update user in Database
  private updateUserData(user){
    //sets user data to fire store on log in
    console.log(`here we go: ${user.uid} `);
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`Users/${user.uid}`);

    this.data ={
      uid: user.uid,
      email: user.email,
    };

    return userRef.set(this.data, {merge:true});
  }


  getCurrentUser(){
    return this.data;
  }



}
