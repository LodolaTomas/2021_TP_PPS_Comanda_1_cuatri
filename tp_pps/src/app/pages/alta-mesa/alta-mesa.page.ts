import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alta-mesa',
  templateUrl: './alta-mesa.page.html',
  styleUrls: ['./alta-mesa.page.scss'],
})
export class AltaMesaPage implements OnInit {
  public cantidadComensales: number;

  constructor() {
    this.cantidadComensales= 0;
  }

  ngOnInit() {}

  agregarComensal() {

      this.cantidadComensales += 1;

  }

  retirarComensal() {

    if(this.cantidadComensales <=1 )
    {
      this.cantidadComensales =1
    }
    else {
      this.cantidadComensales  -= 1;
    }
  
  }


}
