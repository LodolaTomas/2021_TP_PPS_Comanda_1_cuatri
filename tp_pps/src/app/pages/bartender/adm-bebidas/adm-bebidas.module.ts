import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdmBebidasPageRoutingModule } from './adm-bebidas-routing.module';

import { AdmBebidasPage } from './adm-bebidas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdmBebidasPageRoutingModule
  ],
  declarations: [AdmBebidasPage]
})
export class AdmBebidasPageModule {}
