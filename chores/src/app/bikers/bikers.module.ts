import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BikersPageRoutingModule } from './bikers-routing.module';

import { BikersPage } from './bikers.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BikersPageRoutingModule
  ],
  declarations: [BikersPage]
})
export class BikersPageModule {}
