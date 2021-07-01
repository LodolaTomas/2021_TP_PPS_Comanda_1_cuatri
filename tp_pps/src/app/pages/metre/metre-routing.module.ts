import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MetrePage } from './metre.page';

const routes: Routes = [
  {
    path: '',
    component: MetrePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MetrePageRoutingModule {}
