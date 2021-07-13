import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationsService } from 'src/app/services/notifications.service';
import { CloudFirestoreService } from 'src/app/services/cloud-firestore.service';


@Component({
  selector: 'app-adm-pedidos',
  templateUrl: './adm-pedidos.page.html',
  styleUrls: ['./adm-pedidos.page.scss'],
})
export class AdmPedidosPage implements OnInit {



  public verPendientes: boolean = true;
  public verEnPreparacion: boolean = false;
  public verAentregar: boolean = false;
  public verAcobrar: boolean = false;
  public verCobrados: boolean = false;

  public buttonColor1: string = "light";
  public buttonColor2: string = "dark";
  public buttonColor3: string = "dark";
  public buttonColor4: string = "dark";
  public buttonColor5: string = "dark";
  public usuarioLog: any = {}
  public usuarios: any = []
  public pedidos: any = []


  constructor(private authS: AuthService,
    private notifSVC: NotificationsService,
    private router: Router,
    private firestore: CloudFirestoreService) {

    this.usuarios = ''
    this.usuarioLog = ''
    this.pedidos = ''



    firestore.GetAll("usuarios")
      .subscribe((data) => {
        this.usuarios = data;
        this.traerUsuario()
      });


    firestore.GetAll("pedidos")
      .subscribe((data) => {
        this.pedidos = data;
        this.notificarPendientes()

      });

  }

  notificarPendientes() {
    this.pedidos.forEach(uno => {
      if (uno.status == 'pendiente') {
        this.usuarioLog = JSON.parse(localStorage.getItem('token'));
        this.notifSVC.notifyByProfile("Pedidos pendientes", this.usuarioLog, 'mozo')//Mensaje, usuario logeado, y perfiles a notificar
      }

    });
  }


  async traerUsuario() {
    this.authS.GetCurrentUser().then((response) => {
      if (response != null) {
        let user = this.usuarios.filter((u) => u.email == response.email);

        localStorage.setItem('token', JSON.stringify(user[0]))
      }
    });
  }

  seleccionarFiltro(tipo: string) {

    switch (tipo) {
      case 'pendientes':
        this.buttonColor1 = "light";
        this.buttonColor2 = "dark";
        this.buttonColor3 = "dark";
        this.buttonColor4 = "dark";
        this.buttonColor5 = "dark";
        break;
      case 'preparando':
        this.buttonColor1 = "dark";
        this.buttonColor2 = "light";
        this.buttonColor3 = "dark";
        this.buttonColor4 = "dark";
        this.buttonColor5 = "dark";
        break;
      case 'entregar':
        this.buttonColor1 = "dark";
        this.buttonColor2 = "dark";
        this.buttonColor3 = "light";
        this.buttonColor4 = "dark";
        this.buttonColor5 = "dark";
        break;
        case 'cobrar':
          this.buttonColor1 = "dark";
          this.buttonColor2 = "dark";
          this.buttonColor3 = "dark";
          this.buttonColor4 = "light";
          this.buttonColor5 = "dark";
        break;
        case 'cobrados':
          this.buttonColor1 = "dark";
          this.buttonColor2 = "dark";
          this.buttonColor3 = "dark";
          this.buttonColor4 = "dark";
          this.buttonColor5 = "light";
        break;


    }
  }

  verPendientesBTN() {
    if (this.verPendientes) {

    }
    else {
      this.seleccionarFiltro('pendientes')
      this.verEnPreparacion = false;
      this.verPendientes = true;
      this.verAentregar = false;
      this.verAcobrar = false;
      this.verCobrados = false;
    }

  }

  verEnPreparacionBTN() {
    if (this.verEnPreparacion) {

    }
    else {
      this.seleccionarFiltro('preparando')
      this.verEnPreparacion = true;
      this.verPendientes = false;
      this.verAentregar = false;
      this.verAcobrar = false;
      this.verCobrados = false;
    }

  }

  verAentregarBTN() {
    if (this.verAentregar) {

    }
    else {
      this.seleccionarFiltro('entregar')
      this.verEnPreparacion = false;
      this.verPendientes = false;
      this.verAentregar = true;
      this.verAcobrar = false;
      this.verCobrados = false;
    }

  }

  verAcobrarBTN() {
    if (this.verAcobrar) {

    }
    else {
      this.seleccionarFiltro('cobrar')
      this.verEnPreparacion = false;
      this.verPendientes = false;
      this.verAentregar = false;
      this.verAcobrar = true;
      this.verCobrados = false;
    }

  }
  
  verCobradosBTN() {
    if (this.verCobrados) {

    }
    else {
      this.seleccionarFiltro('cobrados')
      this.verEnPreparacion = false;
      this.verPendientes = false;
      this.verAentregar = false;
      this.verAcobrar = false;
      this.verCobrados = true;
    }

  }
 

  ngOnInit() {


  }

  back() {
    this.router.navigateByUrl("mozo")

  }

  Aceptar(pedido) {
    let auxPedido = pedido;
    pedido.status = 'preparando';

    this.firestore.Update(pedido.id, "pedidos", auxPedido)

  }

  Entregar(pedido) {
    let auxPedido = pedido;
    pedido.status = 'entregando';
    
    this.firestore.Update(pedido.id, "pedidos", auxPedido)

  }

  Cobrar(pedido) {
    let auxPedido = pedido;
    pedido.status = 'cobrado';

    this.firestore.Update(pedido.id, "pedidos", auxPedido)

  }

  Rechazar(pedido) {
    let auxPedido = pedido;
    pedido.status = 'rechazado';

    this.firestore.Update(pedido.id, "pedidos", auxPedido)
  }


}