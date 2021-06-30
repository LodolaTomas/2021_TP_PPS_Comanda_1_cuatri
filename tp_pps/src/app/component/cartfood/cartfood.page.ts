import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cartfood',
  templateUrl: './cartfood.page.html',
  styleUrls: ['./cartfood.page.scss'],
})
export class CartfoodPage implements OnInit {

  carrito=[]
  constructor(private router:Router) { 
  }

  ngOnInit() {
  }

  back(){
    this.router.navigateByUrl('home-clientes')
  }

}
