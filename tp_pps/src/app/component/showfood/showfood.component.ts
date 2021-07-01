import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-showfood',
  templateUrl: './showfood.component.html',
  styleUrls: ['./showfood.component.scss'],
})
export class ShowfoodComponent implements OnInit {
  item: any = {}
  quantity: number;
  price: number;
  constructor(private navPrarams: NavParams, private modalController: ModalController) {
    this.item = this.navPrarams.get('value')
    this.quantity = this.item.quantity;
    this.price = this.item.price
  }

  ngOnInit() {

  }
  back() {
    this.modalController.dismiss(null)
  }
  removeQuantity() {

    if (this.quantity > 1) {
      this.quantity--;
      this.price -= this.item.price;
    }

  }
  addQuantity() {
    this.quantity++;
    this.price += this.item.price;
  }

  addToCart(){
    let data ={food_name:this.item.name,total_price:this.price,total_quantity:this.quantity}
    this.modalController.dismiss(data)
  }
}
