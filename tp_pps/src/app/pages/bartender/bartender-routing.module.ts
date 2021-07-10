import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BartenderPage } from './bartender.page';

const routes: Routes = [
  {
    path: '',
    component: BartenderPage
  },
  {
    path: 'adm-bebidas',
    loadChildren: () => import('./adm-bebidas/adm-bebidas.module').then( m => m.AdmBebidasPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BartenderPageRoutingModule {}
