import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { CloudFirestoreService } from 'src/app/services/cloud-firestore.service';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  edit: boolean = false;
  data: any;
  flag: boolean = false;
  editOrder: string = 'Editar';
  pedir = 'Realizar Pedido';
  array1: Array<any> = [];
  token: any;
  client: any;

  loading: boolean = false;

  constructor(
    private navPrarams: NavParams,
    private modalController: ModalController,
    private fire: CloudFirestoreService
  ) {
    this.data = this.navPrarams.get('value');
    if (this.data.flag) {
      this.edit = true;
    }

    this.token = JSON.parse(localStorage.getItem('token'))
    this.searchActiveUser();
  }

  ngOnInit() { }
  back() {
    console.log(this.data);
    this.modalController.dismiss(this.data);
  }

  async searchActiveUser() {

    const client = await this.fire.GetByParameter("usuarios", "email", this.token).get().toPromise()
    if (!client.empty) {
      var user = client.docs[0].data();
      this.client = user
    }

    console.log(client)

  }

  edit_Order() {
    if (this.editOrder === 'Editar') {
      this.editOrder = 'Aceptar';
      this.flag = true;
      this.pedir = 'Eliminar seleccionados';
      this.loading = false;
    } else {
      this.editOrder = 'Editar';
      this.flag = false;
      this.pedir = 'Realizar Pedido';
      this.loading = false;
    }

  }

  isChecked(event, index) {
    if (!event.target.checked) {
      this.array1.push(index);
    } else {
      const index1 = this.array1.indexOf(index);
      this.array1.splice(index1, 1);
    }
  }
  optionsOrder() {

    this.loading = true;

    if (this.flag) {
      if (this.array1.length === this.data.order.length) {
        this.modalController.dismiss({ borrados: true });
      } else {
        this.array1.forEach((element) => {
          this.data.total_amount -= this.data.order[element].price;
          this.data.total_quantity -= this.data.order[element].quantity;
          this.data.order.splice(element, 1);
          this.loading = false;
        });
      }
    }

    if (this.flag == false) {

      this.data.table = this.client.table;

      this.fire.InsertCustomID('pedidos', this.data.id, Object.assign({}, this.data)).then(() => {
        this.alert('success', 'Pedido realizado');
        localStorage.setItem('pedido', JSON.stringify(this.data))

        this.loading = false;
      })
    }


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
}
