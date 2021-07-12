import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { CloudFirestoreService } from 'src/app/services/cloud-firestore.service';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { NotificationsService } from 'src/app/services/notifications.service';
import { ModalController } from '@ionic/angular';
import { MakeOrderComponent } from 'src/app/component/make-order/make-order.component';

@Component({
  selector: 'app-home-clientes',
  templateUrl: './home-clientes.page.html',
  styleUrls: ['./home-clientes.page.scss'],
})
export class HomeClientesPage implements OnInit {
  navigate: any;
  encodedData: any;
  scannedBarCode: {};
  input: any;
  idMesa: any;
  displayQREspera: boolean = true;
  numeroMesa: number;
  displayQRmesa: boolean = true;
  actionsMesa: boolean = true;
  carga: boolean = false;
  existeUserEnListaEspera: boolean = false;
  userEsperandoAsignacionDeMesa: boolean = false;
  realizopedido: boolean = true
  recibido: boolean = true
  public usuarios: any = [];
  public usuarioLog: any = {};
  public tokenUser: any = [];
  public statusPedidoLabel: string;
  public pedido: any = {};
  //barcodeScannerOptions: BarcodeScannerOptions;

  constructor(
    private authS: AuthService,
    private router: Router,
    private scanner: BarcodeScanner,
    private fbService: CloudFirestoreService,
    private modalController: ModalController
  ) {
    this.getUser();
  }

  async getUser() {
    let table = -1;
    this.fbService.GetByParameter('usuarios', 'email', JSON.parse(localStorage.getItem('token'))).valueChanges().subscribe(async user => {
      this.tokenUser = user[0];
      if (this.tokenUser.table != null) {
        this.userEsperandoAsignacionDeMesa = true;
      }
    })
  }
  getPedidoPorMesa(table) {
    this.fbService.GetByParameter('pedidos', 'table', table).valueChanges().subscribe(async pedidos => {
      if (pedidos.length > 0) {
        pedidos.forEach(pedidoItem => {
          if (pedidoItem.status !== 'cobrado') {
            this.pedido = pedidoItem;
            if (pedidoItem.status == 'preparando')
              this.statusPedidoLabel = "Su pedido está en preparación, en breve lo estará recibiendo";
            else if (pedidoItem.status == 'entregando')
              this.statusPedidoLabel = "¡Su pedido está listo para ser entregado!";
            else if (pedidoItem.status == 'entregado')
              this.statusPedidoLabel = "Pedido entregado. ¡Buen provecho!";
          }
        });
      }
    })
  }
  ngOnInit() {

  }

  confirm() {
    this.fbService.Update(this.pedido.id, "pedidos", { status: 'entregado' })
  }

  logout() {
    this.idMesa = localStorage.removeItem('idMesa');
    localStorage.removeItem('token');
    this.authS.LogOutCurrentUser();
    this.router.navigateByUrl('login');
  }

  openQR() {
    this.scanner
      .scan()
      .then((res) => {
        console.log(res.text);
        if (res.text == 'listadeespera') {
          if (this.tokenUser.waitinglist == false) {
            const userWaitingList = {
              id: this.tokenUser.id,
              status: 'esperando',
              date: new Date(),
            };
            this.fbService
              .Insert('lista_espera_local', userWaitingList)
              .then(() => {
                this.alert('success', 'Agregado a la lista de espera!');
                this.existeUserEnListaEspera = true;
                this.fbService.Update(this.tokenUser.id, 'usuarios', { waitinglist: true })
              });
          }
        }
        if (this.tokenUser.table != null) {
          console.log('mesa' + this.tokenUser.table)
          if (res.text == 'mesa' + this.tokenUser.table) {
            this.actionsMesa = true;
            this.getPedidoPorMesa(this.tokenUser.table);
          } else {
            this.alert('error', 'No es la Mesa Asignada')
          }
        }
        if (this.tokenUser.estado == 'pendiente') {
          this.realizopedido = true;
        }
        if (this.tokenUser.estado = 'recibido') {
          this.recibido = true;
        }
      })
      .catch((err) => {
        alert(err);
      });
  }


  openQRmesa() {
    this.displayQRmesa = false;
    this.carga = true;
    this.scanner
      .scan()
      .then((res) => {
        this.scannedBarCode = res;
        console.log(res);
        this.idMesa = this.scannedBarCode['text'];
        localStorage.setItem('idMesa', this.idMesa);
        this.actionsMesa = true;
      })
      .catch((err) => {
        alert(err);
      });
  }

  consultar() {
    console.log(this.idMesa);
    this.router.navigateByUrl('consultas');
  }

  cartfood() {
    this.router.navigateByUrl('cartfood');
  }

  BTNjuegos() {
    this.router.navigateByUrl('home-juegos');
  }

  async theBill() {
    let pedido = JSON.parse(localStorage.getItem('pedido'));
    const modal = await this.modalController.create({
      component: MakeOrderComponent,
      componentProps: { value: pedido },
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    console.log(data);
  }

  BTNencuesta() {
    if (this.tokenUser.encuestado == false) {
      this.router.navigateByUrl('encuesta');
    }
    else {
      this.router.navigateByUrl('resultados')
    }

  }

  alert(icon: SweetAlertIcon, text: string) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'bottom',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,

      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon: icon,
      title: text,
    });
  }
}
