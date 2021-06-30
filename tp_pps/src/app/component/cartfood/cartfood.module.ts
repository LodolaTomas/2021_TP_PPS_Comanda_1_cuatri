import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';


import { CartfoodPage } from './cartfood.page';
import { CartfoodPageRoutingModule } from './cartfood-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CartfoodPageRoutingModule
  ],
  declarations: [CartfoodPage]
})
export class CartfoodPageModule {}
