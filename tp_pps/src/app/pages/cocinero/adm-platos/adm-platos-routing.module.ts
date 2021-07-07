import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdmPlatosPage } from './adm-platos.page';

const routes: Routes = [
  {
    path: '',
    component: AdmPlatosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdmPlatosPageRoutingModule {}
