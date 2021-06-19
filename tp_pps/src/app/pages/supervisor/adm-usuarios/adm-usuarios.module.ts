import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdmUsuariosPageRoutingModule } from './adm-usuarios-routing.module';

import { AdmUsuariosPage } from './adm-usuarios.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdmUsuariosPageRoutingModule
  ],
  declarations: [AdmUsuariosPage]
})
export class AdmUsuariosPageModule {}
