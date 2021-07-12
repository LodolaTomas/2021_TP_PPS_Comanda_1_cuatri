import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationsService } from 'src/app/services/notifications.service';
import { CloudFirestoreService } from 'src/app/services/cloud-firestore.service';

@Component({
  selector: 'app-adm-bebidas',
  templateUrl: './adm-bebidas.page.html',
  styleUrls: ['./adm-bebidas.page.scss'],
})
export class AdmBebidasPage implements OnInit {


  public verPendientes: boolean = true;
  public verAceptados: boolean = false;
  public verTodos: boolean = false;

  public buttonColor1: string = "light";
  public buttonColor2: string = "dark";
  public buttonColor3: string = "dark";
  public usuarioLog: any = {};
  public usuarios: any = [];
  public pedidos: any = [];
  public bebidas: any = [];


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
        this.filtrarAlimentos()

      });

  }

  notificarPendientes() {
    this.pedidos.forEach(uno => {

      if (uno.status == 'preparando') {

        this.usuarioLog = JSON.parse(localStorage.getItem('token'));
        console.log(this.usuarioLog)
        this.notifSVC.notifyByProfile("Platos pendientes", this.usuarioLog, 'cocinero')//Mensaje, usuario logeado, y perfiles a notificar
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


  ngOnInit() {


  }

  back() {
    this.router.navigateByUrl("cocinero")

  }

  Aceptar(pedido) {

    console.log(pedido)
    this.firestore.Update(pedido.value[0].idTable, "pedidos", { statusBartender: true })

  }



  filtrarAlimentos() {

    this.bebidas.splice(0, this.bebidas.length)

    this.pedidos.forEach(pedido => {

      if (pedido.status === 'preparando') {

        pedido.order.forEach(plato => {

          if (pedido.statusBartender) {
            return
          }



          if (this.bebidas[pedido.table] == undefined) {
            this.bebidas[pedido.table] = [];
          }


          if (plato.type == 'bebida') {
            plato.idTable = pedido.id

            this.bebidas[pedido.table].push(plato)
          }



        })
      }
    })


    console.log(this.bebidas)

  }


}