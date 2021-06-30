import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CartfoodPage } from './cartfood.page';

const routes: Routes = [
  {
    path: '',
    component: CartfoodPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CartfoodPageRoutingModule {}
