import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  // searchbar: HTMLIonSearchbarElement = document.querySelector('ion-searchbar');
  // items = Array.from(document.querySelector('ion-list').children);
  // this.searchbar.addEventListener('ionInput', handleInput());

  constructor(private auth:AuthService, private router:Router) {
    
  }

  ngOnInit(){
    this.auth.sidemenu = false;
  }

  // handleInput(event) {
  //   const query = event.target.value.toLowerCase();
  //   requestAnimationFrame(() => {
  //     this.items.forEach(item => {
  //       const shouldShow = item.textContent.toLowerCase().indexOf(query) > -1;
  //       item.style.display = shouldShow ? 'block' : 'none';
  //     });
  //   });
  // }

  signOut(){
    this.auth.googleSignOut();
    this.router.navigate(['login']);
    
  }

  selectService(serviceName:string){
    let hole = serviceName.toLocaleLowerCase();
    this.router.navigate(['bikers']);
  }

}
