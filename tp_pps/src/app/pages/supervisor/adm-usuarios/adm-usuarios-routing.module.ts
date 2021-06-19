import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdmUsuariosPage } from './adm-usuarios.page';

const routes: Routes = [
  {
    path: '',
    component: AdmUsuariosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdmUsuariosPageRoutingModule {}
