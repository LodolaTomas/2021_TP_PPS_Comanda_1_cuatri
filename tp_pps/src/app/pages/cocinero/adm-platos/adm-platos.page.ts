import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationsService } from 'src/app/services/notifications.service';
import { CloudFirestoreService } from 'src/app/services/cloud-firestore.service';


@Component({
  selector: 'app-adm-platos',
  templateUrl: './adm-platos.page.html',
  styleUrls: ['./adm-platos.page.scss'],
})
export class AdmPlatosPage implements OnInit {


  public verPendientes: boolean = true;
  public verAceptados: boolean = false;
  public verTodos: boolean = false;

  public buttonColor1: string = "light";
  public buttonColor2: string = "dark";
  public buttonColor3: string = "dark";
  public usuarioLog: any = {};
  public usuarios: any = [];
  public pedidos: any = [];
  public alimentos: any = [];


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
    this.firestore.Update(pedido.value[0].idTable, "pedidos", { statusCheff: true })

  }




  filtrarAlimentos() {

    this.alimentos.splice(0, this.alimentos.length)

    this.pedidos.forEach(pedido => {
      if (pedido.status === 'preparando') {

        pedido.order.forEach(plato => {

          if (pedido.statusCheff) {
            return
          }

          if (this.alimentos[pedido.table] == undefined) {
            this.alimentos[pedido.table] = [];
          }

          if (plato.type == 'comida' || plato.type == 'postre') {
            plato.idTable = pedido.id

            this.alimentos[pedido.table].push(plato)
          }
        })
      }
    })
  }
}