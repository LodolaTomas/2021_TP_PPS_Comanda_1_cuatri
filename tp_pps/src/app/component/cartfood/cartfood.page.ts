import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { CloudFirestoreService } from 'src/app/services/cloud-firestore.service';
@Component({
  selector: 'app-cartfood',
  templateUrl: './cartfood.page.html',
  styleUrls: ['./cartfood.page.scss'],
})
export class CartfoodPage implements OnInit {
  listFood=[]
  listdrinks=[]
  listdessert=[]
  carrito=[]
  comida=true;
  bebida=false;
  postre=false;
  constructor(private router:Router,private fire:CloudFirestoreService) { 
    fire.GetAll('productos').subscribe(data=>{
      data.forEach(element=>{
        if(element.type=='postre'){
          this.listdessert.push(element);
        }
        if(element.type=='comida'){
          this.listFood.push(element);
        }
        if(element.type=='bebida'){
          this.listdrinks.push(element);
        }
      })
    })
    console.log(this.listdessert)
  }

  ngOnInit() {
  }

  selectFood(){
    this.postre=false;
    this.bebida=false;
    this.comida=true;
  }
  selectDrink(){
    this.comida=false;
    this.bebida=true;
    this.postre=false;
  }

  selectDessert(){
    this.postre=true;
    this.bebida=false;
    this.comida=false;
  }

  back(){
    this.router.navigateByUrl('home-clientes')
  }

}
