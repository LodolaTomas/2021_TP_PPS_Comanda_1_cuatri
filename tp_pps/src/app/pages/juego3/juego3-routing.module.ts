import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Juego3Page } from './juego3.page';

const routes: Routes = [
  {
    path: '',
    component: Juego3Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Juego3PageRoutingModule {}
