import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CocineroPage } from './cocinero.page';

const routes: Routes = [
  {
    path: '',
    component: CocineroPage
  },
  {
    path: 'adm-platos',
    loadChildren: () => import('./adm-platos/adm-platos.module').then( m => m.AdmPlatosPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CocineroPageRoutingModule {}
