import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CloudFirestoreService } from 'src/app/services/cloud-firestore.service';
import { AuthService } from 'src/app/services/auth.service';

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

  constructor(private router: Router,
    private authS: AuthService,
    private fbService: CloudFirestoreService) {
  }

  ngOnInit() {
  }


  back() {
    this.router.navigateByUrl("home-clientes")
  }

  getPedidoPorMesa(table) {
    this.fbService.GetByParameter('pedidos', 'table', table).valueChanges().subscribe(async pedidos => {
      if (pedidos.length > 0) {
        pedidos.forEach(pedidoItem => {
          if (pedidoItem.status !== 'cobrado') {
            this.pedido = pedidoItem;

          }
        });
      }
    })
  }

  async getUser() {
    this.fbService.GetByParameter('usuarios', 'email', JSON.parse(localStorage.getItem('token'))).valueChanges().subscribe(async user => {
      this.tokenUser = user[0];
      console.log( this.tokenUser)
    })
  }


}
