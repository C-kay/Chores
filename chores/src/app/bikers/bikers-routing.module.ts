import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BikersPage } from './bikers.page';

const routes: Routes = [
  {
    path: '',
    component: BikersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BikersPageRoutingModule {}
