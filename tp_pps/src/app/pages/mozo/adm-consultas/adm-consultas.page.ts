import { NotificationsService } from '../../../services/notifications.service';
import { ChatService } from '../../../services/chat.service';
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

  public mensajeEnviado: any = {};

  public mesa1: any = []
  public mesa2: any = []
  public mesa3: any = []

  public userActivo: any = []


  mensaje: any;

  item$: Observable<any[]>;

  public msjs: any = []


  public listChats: boolean = true


  constructor(private firestore: CloudFirestoreService, private router: Router, private chatSVC: ChatService, private notiSVC: NotificationsService) {

    this.usuarios = ''


    firestore.GetAll("usuarios")
      .subscribe((data) => {
        this.usuarios = data;
        this.traerUsuario()
      });

    this.item$ = chatSVC.ObtenerTodos().valueChanges();

    chatSVC.ObtenerTodos().valueChanges().subscribe((data) => {
      this.mensajes = data;


      if (this.mensajes[this.mensajes.length - 1].nombre !== this.usuarioLog.name) //true?
      {
        this.notiSVC.notifyByProfile("Tiene un mensaje nuevo", this.usuarioLog, "mozo")

      }
    });
  }

  async traerUsuario() {

    const fbCollection = await this.firestore.GetByParameter("usuarios", "email", this.usuarioLog.email).get().toPromise();
    const element = fbCollection.docs[0].data();
    this.usuarioLog = element
    localStorage.setItem('token', JSON.stringify(element));


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
    this.usuarioLog = JSON.parse(localStorage.getItem('token'));
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