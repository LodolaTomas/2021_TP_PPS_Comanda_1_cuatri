import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { CloudFirestoreService } from 'src/app/services/cloud-firestore.service';
import Swal, { SweetAlertIcon } from 'sweetalert2';
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
  total_elaboration=0
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
      this.carrito.push(data.food_obj) 
    }

  }

  makeOrder(){
    let flag=true;
    this.carrito.forEach(element=>{
      if(flag || element.elaboration_time>this.total_elaboration){
        this.total_elaboration=element.elaboration_time;
        flag=false;
      }
    })
    let order:any={'order':this.carrito,'total_amount':this.total_price,'total_quantity':this.total_quantity,'total_time':this.total_elaboration,'status':'pendiente','id':'1'}
    let id=this.fire.ReturnFirestore().createId();
    order.id=id;
    this.fire.InsertCustomID('pedidos',id,order).then(()=>{
      this.alert('success','Pedido realizado');
      localStorage.setItem('pedido',JSON.stringify(order))
      /* this.router.navigateByUrl('home-clientes') */
    });
  }


  alert(icon: SweetAlertIcon, text: string) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'center',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,

      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })

    Toast.fire({
      icon: icon,
      title: text
    })
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
