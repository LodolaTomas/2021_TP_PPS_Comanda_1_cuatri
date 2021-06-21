import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaEsperaMesasPage } from './lista-espera-mesas.page';

const routes: Routes = [
  {
    path: '',
    component: ListaEsperaMesasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaEsperaMesasPageRoutingModule {}
