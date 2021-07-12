import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-juegos',
  templateUrl: './home-juegos.page.html',
  styleUrls: ['./home-juegos.page.scss'],
})
export class HomeJuegosPage implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }
  juego1(){
    this.router.navigateByUrl('juegos');
  }
  juego2(){
    this.router.navigateByUrl('juego2');
  }
  juego3(){
    this.router.navigateByUrl('juego3');

  }
}
