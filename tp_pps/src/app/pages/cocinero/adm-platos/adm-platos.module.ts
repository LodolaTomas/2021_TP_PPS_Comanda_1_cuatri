import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdmPlatosPageRoutingModule } from './adm-platos-routing.module';

import { AdmPlatosPage } from './adm-platos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdmPlatosPageRoutingModule
  ],
  declarations: [AdmPlatosPage]
})
export class AdmPlatosPageModule {}
