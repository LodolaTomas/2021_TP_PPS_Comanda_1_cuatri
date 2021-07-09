import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-showfood',
  templateUrl: './showfood.component.html',
  styleUrls: ['./showfood.component.scss'],
})
export class ShowfoodComponent implements OnInit {
  item: any = [];
  quantity: number;
  price: number;
  constructor(
    private navPrarams: NavParams,
    private modalController: ModalController
  ) {
    
  }

  ngOnInit() {
    this.item = this.navPrarams.get('value');
    this.quantity = 1;
    this.price = this.item.price;
    if (this.quantity <= 1) {
      document
        .getElementById('icon_remove')
        .setAttribute('style', 'color:gray;font-size: 25px;');
    }
  }
  back() {
    this.modalController.dismiss(null);
  }
  removeQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
      this.price -= this.item.price;
    }
    if (this.quantity <= 1) {
      document
        .getElementById('icon_remove')
        .setAttribute('style', 'color:gray;font-size: 25px;');
    }
  }
  addQuantity() {
    this.quantity++;
    this.price += this.item.price;
    if (this.quantity >= 2) {
      document.getElementById('icon_remove').style.color = 'black';
    }
  }

  addToCart() {
    this.item.quantity=this.quantity
    let data = {
      food_obj: this.item,
      total_price: this.price,
      total_quantity: this.quantity
    };
    this.modalController.dismiss(data);
  }
}
