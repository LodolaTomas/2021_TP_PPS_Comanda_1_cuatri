import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeJuegosPage } from './home-juegos.page';

const routes: Routes = [
  {
    path: '',
    component: HomeJuegosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeJuegosPageRoutingModule {}
