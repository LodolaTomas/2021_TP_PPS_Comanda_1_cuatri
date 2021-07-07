import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EstadoPedidoPage } from './estado-pedido.page';

const routes: Routes = [
  {
    path: '',
    component: EstadoPedidoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EstadoPedidoPageRoutingModule {}
