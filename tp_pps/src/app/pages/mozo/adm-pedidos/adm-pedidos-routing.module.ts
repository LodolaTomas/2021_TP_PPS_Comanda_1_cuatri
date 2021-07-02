import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdmPedidosPage } from './adm-pedidos.page';

const routes: Routes = [
  {
    path: '',
    component: AdmPedidosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdmPedidosPageRoutingModule {}
