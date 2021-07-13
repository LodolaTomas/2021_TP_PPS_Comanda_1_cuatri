import { ChatService } from './../../services/chat.service';
import { Router } from '@angular/router';
import { CloudFirestoreService } from 'src/app/services/cloud-firestore.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { NotificationsService } from 'src/app/services/notifications.service';

@Component({
  selector: 'app-consultas',
  templateUrl: './consultas.page.html',
  styleUrls: ['./consultas.page.scss'],
})
export class ConsultasPage implements OnInit {

  public idMesa: any = '';
  public mensajes: any = []

  public usuarioLog: any = {}
  public usuarios: any = []
  public msg: string;

  public mensajeEnviado: any = {};

  public hayConsultas: boolean = false;


  mensaje: any;

  item$: Observable<any[]>;

  constructor(private authS: AuthService, private firestore: CloudFirestoreService, private router: Router, private chatSVC: ChatService, private notiSVC: NotificationsService) {

    this.idMesa = localStorage.getItem('idMesa')

    this.usuarios = ''




    firestore.GetAll("usuarios")
      .subscribe((data) => {
        this.usuarios = data;
        this.traerUsuario()

      });

    this.item$ = chatSVC.ObtenerTodos().valueChanges();
    chatSVC.ObtenerTodos().valueChanges().subscribe((data) => {
      this.mensajes = data;
      if (this.mensajes.length) {
        if (this.mensajes[this.mensajes.length - 1].nombre !== this.usuarioLog.name) {
          this.usuarioLog = JSON.parse(localStorage.getItem('token'));
          this.notiSVC.notifyByProfile("Tiene un mensaje nuevo", this.usuarioLog, "cliente")
        }
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
    this.usuarioLog = JSON.parse(localStorage.getItem('token'));
  }

  back() {
    this.router.navigateByUrl('home-clientes')
  }

  enviar() {
    this.mensajeEnviado.nombre = this.usuarioLog.name;
    this.mensajeEnviado.text = this.msg;
    this.mensajeEnviado.mesa = this.idMesa;
    this.chatSVC.Crear(this.mensajeEnviado).then(() => {
      this.notiSVC.notifyByProfile("Tiene un mensaje nuevo", this.usuarioLog, "mozo")
      this.msg = '';
    });
  }
}
