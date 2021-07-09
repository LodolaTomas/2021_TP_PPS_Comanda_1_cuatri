import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  edit:boolean=false;
  data:any;
  flag:boolean=false;
  editOrder:string='Editar';
  pedir='Realizar Pedido';
  array1:Array<any>=[]
  constructor(private navPrarams: NavParams,
    private modalController: ModalController) {
   this.data = this.navPrarams.get('value');
    if(this.data.flag){
      this.edit=true;
    }
  }

  ngOnInit() {
    
   }
   back() {
    this.modalController.dismiss(null);
  }
  edit_Order(){
    if(this.editOrder==='Editar'){
      this.editOrder='Aceptar'
      this.flag=true;
      this.pedir='Eliminar seleccionados';
    }else{
      this.editOrder='Editar'
      this.flag=false;
      this.pedir='Realizar Pedido';
    }

  }
  isChecked(event,index) {
    
      if (!event.target.checked) {
        this.array1.push(index)
     }else{
       const index1=this.array1.indexOf(index)
       this.array1.splice(index1,1)
     }
  }
  optionsOrder(){
    if(this.flag){
      this.array1.forEach(element => {
        this.data.order.splice(element,1)
      });
      if(this.data.order.length==0){
        this.modalController.dismiss({borrados:true});
      }
    }
  }

}
