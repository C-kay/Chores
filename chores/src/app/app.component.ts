import { Component } from '@angular/core';

import { Platform, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import {AuthService} from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Profile',
      url: '/profile',
      icon: 'person-circle'
    },
    {
      title: 'Chores',
      url: '/home',
      icon: 'bicycle'
    },
    {
      title: 'Payment',
      url: '/payment',
      icon: 'cash'
    },
    {
      title: 'Notifications',
      url: '/notifications',
      icon: 'notifications'
    },
    {
      title: 'Settings',
      url: 'settings',
      icon: 'settings'
    },
    {
      title: 'About',
      url: '/about',
      icon: 'information-circle'
    }
  ];
  
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public auth:AuthService,
    private router:Router,
    private menuCtrl:MenuController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }

    //const user= this.auth.getCurrentUser().email;
  }

  signOut(){
    this.auth.googleSignOut();
    this.router.navigate(['login']);
    this.menuCtrl.close();
    
  }

}
