import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdmBebidasPage } from './adm-bebidas.page';

const routes: Routes = [
  {
    path: '',
    component: AdmBebidasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdmBebidasPageRoutingModule {}
