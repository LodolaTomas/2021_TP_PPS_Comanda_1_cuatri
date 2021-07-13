import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CloudFirestoreService } from 'src/app/services/cloud-firestore.service';
import { AuthService } from 'src/app/services/auth.service';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

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


  constructor(private router: Router,
    private authS: AuthService,
    private fbService: CloudFirestoreService,
    private scanner: BarcodeScanner) { this.getUser(); }

  ngOnInit() {
  }


  test() {
    console.log(this.tokenUser)
    console.log(this.pedido)
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
            console.log(this.pedido)
            this.discountValidator()
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
    if (this.tokenUser.juego2) {

    }
    if (this.tokenUser.juego3) {

    }
  }

  tipCalculator() {
    var auxTotal = this.pedido.total_amount;

    this.totalTip = auxTotal + auxTotal * this.propina / 100
  }


  pay() {
    this.loading = true;


    this.loading = false;

  }


  async getUser() {
    this.fbService.GetByParameter('usuarios', 'email', JSON.parse(localStorage.getItem('token'))).valueChanges().subscribe(async user => {
      this.tokenUser = user[0];
      this.getPedidoPorMesa(this.tokenUser.table);
    })
  }


}
