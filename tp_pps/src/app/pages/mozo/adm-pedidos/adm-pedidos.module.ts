import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdmPedidosPageRoutingModule } from './adm-pedidos-routing.module';

import { AdmPedidosPage } from './adm-pedidos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdmPedidosPageRoutingModule
  ],
  declarations: [AdmPedidosPage]
})
export class AdmPedidosPageModule {}
