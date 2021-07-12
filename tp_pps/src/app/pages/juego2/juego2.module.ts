import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Juego2PageRoutingModule } from './juego2-routing.module';

import { Juego2Page } from './juego2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Juego2PageRoutingModule
  ],
  declarations: [Juego2Page]
})
export class Juego2PageModule {}
