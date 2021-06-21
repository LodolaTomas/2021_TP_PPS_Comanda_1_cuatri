import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaEsperaMesasPageRoutingModule } from './lista-espera-mesas-routing.module';

import { ListaEsperaMesasPage } from './lista-espera-mesas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaEsperaMesasPageRoutingModule
  ],
  declarations: [ListaEsperaMesasPage]
})
export class ListaEsperaMesasPageModule {}
