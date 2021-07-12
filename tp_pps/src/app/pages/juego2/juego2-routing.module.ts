import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Juego2Page } from './juego2.page';

const routes: Routes = [
  {
    path: '',
    component: Juego2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Juego2PageRoutingModule {}
