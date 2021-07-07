import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EstadoPedidoPageRoutingModule } from './estado-pedido-routing.module';

import { EstadoPedidoPage } from './estado-pedido.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EstadoPedidoPageRoutingModule
  ],
  declarations: [EstadoPedidoPage]
})
export class EstadoPedidoPageModule {}
