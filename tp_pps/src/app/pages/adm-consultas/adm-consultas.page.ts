import { NotificationsService } from './../../services/notifications.service';
import { ChatService } from './../../services/chat.service';
import { Router } from '@angular/router';
import { CloudFirestoreService } from 'src/app/services/cloud-firestore.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-adm-consultas',
  templateUrl: './adm-consultas.page.html',
  styleUrls: ['./adm-consultas.page.scss'],
})
export class AdmConsultasPage implements OnInit {

  public idMesa: any = '';
  public mensajes: any = []

  public usuarioLog: any = {}
  public usuarios: any = []
  public msg: string;

  private scrollContainer: any;
  public mensajeEnviado: any = {};

  public mesa1: any = []
  public mesa2: any = []
  public mesa3: any = []


  mensaje: any;

  item$: Observable<any[]>;

  public msjs: any = []


  public listChats: boolean = true


  constructor(private authS: AuthService, private firestore: CloudFirestoreService, private router: Router, private chatSVC: ChatService, private notiSVC: NotificationsService) {

    this.usuarios = ''
    this.usuarioLog = ''

    firestore.GetAll("usuarios")
      .subscribe((data) => {
        this.usuarios = data;
        this.traerUsuario()
      });

    this.item$ = chatSVC.ObtenerTodos().valueChanges();

    chatSVC.ObtenerTodos().valueChanges().subscribe((data) => {
      this.mensajes = data;


      console.log(this.mensajes[this.mensajes.length - 1].nombre)
      console.log(this.usuarioLog.name)

     // console.log(this.usuarioLog.name !== this.mensajes[this.mensajes.length - 1].nombre)  //false


     if (this.mensajes[this.mensajes.length - 1].nombre !== this.usuarioLog.name) //true?
      {
        this.notiSVC.notifyByProfile("Tiene un mensaje nuevo", this.usuarioLog, "mozo")  
     
      }
    });
  }

  async traerUsuario() {
    this.authS.GetCurrentUser().then((response) => {
      if (response != null) {
        let user = this.usuarios.filter((u) => u.email == response.email);
        this.usuarioLog = user[0]
      }
    });
  }

  openChat() {
    if (this.listChats) {
      this.listChats = false
    }
  }

  orderChats() {
    this.msjs.forEach(uno => {

      console.log(uno)
      if (uno.mesa == 'mesa1') {
        this.mesa1.push(uno)
      }
    });

    console.log(this.mesa1)
  }


  traerMensajes(coleccion) {
    this.firestore.GetAll(coleccion)
  }

  ngOnInit() {
  }


  enviar() {
    console.log('enviar');

    this.mensajeEnviado.nombre = this.usuarioLog.name;
    this.mensajeEnviado.text = this.msg;
    this.mensajeEnviado.mesa = this.idMesa;

    this.chatSVC.Crear(this.mensajeEnviado).then(() => {

      this.msg = '';

    });
  }



  back() {


    if (this.listChats) {
      this.router.navigateByUrl("mozo")
    }
    else {

      this.listChats = true;
    }
  }




}
