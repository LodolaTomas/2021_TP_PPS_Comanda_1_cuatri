import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SupervisorPage } from './supervisor.page';

const routes: Routes = [
  {
    path: '',
    component: SupervisorPage
  },
  {
    path: 'adm-usuarios',
    loadChildren: () => import('./adm-usuarios/adm-usuarios.module').then( m => m.AdmUsuariosPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SupervisorPageRoutingModule {}
