import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-juegos',
  templateUrl: './juegos.page.html',
  styleUrls: ['./juegos.page.scss'],
})
export class JuegosPage implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  back() {
    this.router.navigateByUrl('home-clientes')
  }

}
