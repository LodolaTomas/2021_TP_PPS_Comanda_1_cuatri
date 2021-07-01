import { NotificationsService } from './../../../services/notifications.service';
import { TestBed } from '@angular/core/testing';
import { EmailService } from './../../../services/email.service';

import { CloudFirestoreService } from './../../../services/cloud-firestore.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

@Component({
  selector: 'app-adm-usuarios',
  templateUrl: './adm-usuarios.page.html',
  styleUrls: ['./adm-usuarios.page.scss'],
})
export class AdmUsuariosPage implements OnInit {



  public verPendientes: boolean = true;
  public verAceptados: boolean = false;
  public verTodos: boolean = false;

  public buttonColor1: string = "light";
  public buttonColor2: string = "dark";
  public buttonColor3: string = "dark";
  public usuarioLog: any = {}
  public usuarios: any = []


  constructor(private authS: AuthService,
    private notifSVC: NotificationsService,
    private router: Router,
    private firestore: CloudFirestoreService,
    private emailSVC: EmailService) {

    this.usuarios = ''
    this.usuarioLog = ''



    firestore.GetAll("usuarios")
      .subscribe((data) => {
        this.usuarios = data;
        this.traerUsuario()
        this.notificarPendientes()
      });

  }

  notificarPendientes() {
    this.usuarios.forEach(uno => {

      if (uno.estado == 'pendiente') {

        this.usuarioLog = JSON.parse(localStorage.getItem('token'));
        console.log(this.usuarioLog)

        //this.notifSVC.notify("usuarios pendiente")
        this.notifSVC.notifyByProfile("Usuarios pendientes de verificacion", this.usuarioLog, "supervisor")//Mensaje, usuario logeado, y perfiles a notificar
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


  Aceptar(user) {
    let auxUser = user;
    user.estado = 'aceptado';
    //this.emailSVC.sendEmail(user, "Su cuenta ha sido aceptada, ya puede ingresar a la app")
    this.firestore.Update(user.id, "usuarios", auxUser)

  }

  Rechazar(user) {
    let auxUser = user;
    user.estado = 'rechazado';
    //   this.emailSVC.sendEmail(user, "Su cuenta ha sido rechazada, si cree que es un error puede contactar al administrador")
    this.firestore.Update(user.id, "usuarios", auxUser)
  }

  back() {
    this.authS.LogOutCurrentUser()
    this.router.navigateByUrl('supervisor')
  }



}



