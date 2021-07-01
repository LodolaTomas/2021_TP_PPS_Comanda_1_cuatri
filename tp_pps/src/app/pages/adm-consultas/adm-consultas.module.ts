import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdmConsultasPageRoutingModule } from './adm-consultas-routing.module';

import { AdmConsultasPage } from './adm-consultas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdmConsultasPageRoutingModule
  ],
  declarations: [AdmConsultasPage]
})
export class AdmConsultasPageModule {}
