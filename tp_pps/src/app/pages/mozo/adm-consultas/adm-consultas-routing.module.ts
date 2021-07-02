import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdmConsultasPage } from './adm-consultas.page';

const routes: Routes = [
  {
    path: '',
    component: AdmConsultasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdmConsultasPageRoutingModule {}
