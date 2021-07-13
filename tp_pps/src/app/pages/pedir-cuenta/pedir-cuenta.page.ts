import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CloudFirestoreService } from 'src/app/services/cloud-firestore.service';
import { AuthService } from 'src/app/services/auth.service';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import Swal, { SweetAlertIcon } from 'sweetalert2';


@Component({
  selector: 'app-pedir-cuenta',
  templateUrl: './pedir-cuenta.page.html',
  styleUrls: ['./pedir-cuenta.page.scss'],
})
export class PedirCuentaPage implements OnInit {

  public pedido: any = {};
  public usuarios: any = [];
  public usuarioLog: any = {};
  public tokenUser: any = [];
  public loading: boolean = false;
  public escaneo: boolean = false;
  public propina: number = 0;
  public totalTip: number = 0;
  public discount: number = 0;
  public totalDiscount: number;
  public pagado:boolean = false;
  public cobrado:boolean = false;

  constructor(private router: Router,
    private authS: AuthService,
    private fbService: CloudFirestoreService,
    private scanner: BarcodeScanner) { this.getUser(); }

  ngOnInit() {
  }

  back() {
    this.router.navigateByUrl("home-clientes")
  }

  async getPedidoPorMesa(table) {

    this.fbService.GetByParameter('pedidos', 'table', table).valueChanges().subscribe(async pedidos => {
      if (pedidos.length > 0) {
        pedidos.forEach(pedidoItem => {
          if (pedidoItem.status !== 'cobrado') {
            this.pedido = pedidoItem;
            this.discountValidator()
          }
          else if(pedidoItem.status == 'cobrado')
          {
            this.alert('success','¡Pago recibido!')
            this.cobrado = true
            setTimeout(() => {
              this.router.navigateByUrl('home-clientes')
            }, 800);
          }
        });
      }
    })
  }

  openQR() {
    this.escaneo = true;
    this.scanner
      .scan()
      .then((res) => {
        if (res.text === '0') { this.propina = 0 }
        else if (res.text === '5') { this.propina = 5 }
        else if (res.text === '10') { this.propina = 10 }
        else if (res.text === '15') { this.propina = 15 }
        else if (res.text === '20') { this.propina = 20 }

        this.tipCalculator();
      })
      .catch((err) => {
        alert(err);
      });
  }

  discountValidator() {
    if (this.tokenUser.juego1) {

      this.discount = 10 / 100;
      var auxTotal = this.pedido.total_amount;
      this.totalDiscount = auxTotal - auxTotal * this.discount;
    }
    else if (this.tokenUser.juego2) {

    }
    else if (this.tokenUser.juego3) {

    }
    else{
      this.totalDiscount = this.pedido.total_amount;
    }
  }

  tipCalculator() {
    var auxTotal = this.totalDiscount;

    this.totalTip = auxTotal + auxTotal * this.propina / 100
  }


  pay() {
    this.loading = true;
    this.fbService.Update(this.pedido.id, 'pedidos', {status:'pagado'});


    setTimeout(() => {
      this.pagado = true;
      this.loading = false;
      this.alert('info', 'Pago exitoso, espere a que sea aceptado')
    }, 1500);
   
  }


  async getUser() {
    this.fbService.GetByParameter('usuarios', 'id', JSON.parse(localStorage.getItem('token'))).valueChanges().subscribe(async user => {
      this.tokenUser = user[0];
      this.getPedidoPorMesa(this.tokenUser.table);
    })
  }

  alert(icon: SweetAlertIcon, text: string) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'center',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: false,

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
