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
  public verAceptados: boolean = false;
  public verTodos: boolean = false;

  public buttonColor1: string = "light";
  public buttonColor2: string = "dark";
  public buttonColor3: string = "dark";
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
    console.log(data)
    this.notificarPendientes()

      });

  }

  notificarPendientes() {
    this.pedidos.forEach(uno => {

      if (uno.status == 'pendiente') {

        this.usuarioLog = JSON.parse(localStorage.getItem('token'));
        console.log(this.usuarioLog)

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
        break;
      case 'aceptados':
        this.buttonColor1 = "dark";
        this.buttonColor2 = "light";
        this.buttonColor3 = "dark";
        break;
      case 'todos':
        this.buttonColor1 = "dark";
        this.buttonColor2 = "dark";
        this.buttonColor3 = "light";
        break;

    }
  }

  verAceptadosBTN() {
    if (this.verAceptados) {

    }
    else {
      this.seleccionarFiltro('aceptados')
      this.verAceptados = true;
      this.verPendientes = false;
      this.verTodos = false;
    }

  }

  verTodosBTN() {
    if (this.verTodos) {

    }
    else {
      this.seleccionarFiltro('todos')
      this.verAceptados = false;
      this.verPendientes = false;
      this.verTodos = true;
    }

  }

  verPendientesBTN() {
    if (this.verPendientes) {

    }
    else {
      this.seleccionarFiltro('pendientes')
      this.verAceptados = false;
      this.verPendientes = true;
      this.verTodos = false;
    }

  }

  ngOnInit() {


  }

  back() {
    this.router.navigateByUrl("mozo")

  }

  Aceptar(pedido) {
    let auxPedido = pedido;
    pedido.status = 'aceptado';
    //this.emailSVC.sendEmail(user, "Su cuenta ha sido aceptada, ya puede ingresar a la app")
    this.firestore.Update(pedido.id, "pedidos", auxPedido)

  }

  Rechazar(pedido) {
    let auxPedido = pedido;
    pedido.status = 'rechazado';
    //   this.emailSVC.sendEmail(user, "Su cuenta ha sido rechazada, si cree que es un error puede contactar al administrador")
    this.firestore.Update(pedido.id, "pedidos", auxPedido)
  }

}