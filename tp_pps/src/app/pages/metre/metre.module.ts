import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MetrePageRoutingModule } from './metre-routing.module';

import { MetrePage } from './metre.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MetrePageRoutingModule
  ],
  declarations: [MetrePage]
})
export class MetrePageModule {}
