import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeJuegosPageRoutingModule } from './home-juegos-routing.module';

import { HomeJuegosPage } from './home-juegos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeJuegosPageRoutingModule
  ],
  declarations: [HomeJuegosPage]
})
export class HomeJuegosPageModule {}
