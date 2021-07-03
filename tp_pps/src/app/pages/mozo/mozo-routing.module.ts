import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MozoPage } from './mozo.page';

const routes: Routes = [
  {
    path: '',
    component: MozoPage
  },  {
    path: 'adm-pedidos',
    loadChildren: () => import('./adm-pedidos/adm-pedidos.module').then( m => m.AdmPedidosPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MozoPageRoutingModule {}
