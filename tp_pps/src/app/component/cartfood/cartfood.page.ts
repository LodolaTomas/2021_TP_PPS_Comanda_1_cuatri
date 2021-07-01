import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { CloudFirestoreService } from 'src/app/services/cloud-firestore.service';
import { ShowfoodComponent } from '../showfood/showfood.component';
@Component({
  selector: 'app-cartfood',
  templateUrl: './cartfood.page.html',
  styleUrls: ['./cartfood.page.scss'],
})
export class CartfoodPage implements OnInit {
  listFood=[]
  listDrinks=[]
  listDessert=[]
  carrito=[]
  comida=true;
  bebida=false;
  postre=false;
  total_price=0;
  total_quantity=0;
  constructor(private router:Router,private fire:CloudFirestoreService,private modalController: ModalController) { 
    fire.GetAll('productos').subscribe(data=>{
      data.forEach(element=>{
        if(element.type=='postre'){
          this.listDessert.push(element);
        }
        if(element.type=='comida'){
          this.listFood.push(element);
        }
        if(element.type=='bebida'){
          this.listDrinks.push(element);
        }
      })
    })
    console.log(this.listDessert)
  }

  ngOnInit() {
  }
  async openModal(item){
    const modal = await this.modalController.create({
      component: ShowfoodComponent,
      componentProps:{value:item}
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if(data!=null){
      this.total_quantity+=data.total_quantity
      this.total_price+=data.total_price;
      this.carrito.push(data)
    }

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
