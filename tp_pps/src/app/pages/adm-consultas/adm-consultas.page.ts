import { ChatService } from './../../services/chat.service';
import { Router } from '@angular/router';
import { CloudFirestoreService } from 'src/app/services/cloud-firestore.service';
import { Component, OnInit  } from '@angular/core';
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
  public mensajeEnviado:any={};

  
  mensaje: any;

  item$: Observable<any[]>;

  public listChats:boolean=true


  constructor(private authS: AuthService, private firestore: CloudFirestoreService, private router: Router, private chatSVC:ChatService) {

    this.usuarios = ''
    this.usuarioLog = ''

    firestore.GetAll("usuarios")
    .subscribe((data) => {
      this.usuarios = data;
      this.traerUsuario()
    });

    this.item$ = chatSVC.ObtenerTodos().valueChanges();
  }

  async traerUsuario() {
    this.authS.GetCurrentUser().then((response) => {
      if (response != null) {
        let user = this.usuarios.filter((u) => u.email == response.email);
        this.usuarioLog=  user[0]
      }
    });
  }

  openChat()
  {
    if(this.listChats)
    {
      this.listChats = false
    }
  }


  traerMensajes(coleccion)
  {
    this.firestore.GetAll(coleccion)
  }

  ngOnInit() {
  }

  
  enviar()
  {
    console.log('enviar');
    
    this.mensajeEnviado.nombre = this.usuarioLog.name;
    this.mensajeEnviado.text = this.msg;
    this.mensajeEnviado.mesa = this.idMesa;

    this.chatSVC.Crear(this.mensajeEnviado).then(() => {

      this.msg = '';

    });
  }


  
  back() {
    this.listChats = true;
  }

}
