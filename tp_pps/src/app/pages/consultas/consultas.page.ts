import { ChatService } from './../../services/chat.service';
import { Router } from '@angular/router';
import { CloudFirestoreService } from 'src/app/services/cloud-firestore.service';
import { Component, OnInit  } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';

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

  private scrollContainer: any;
  public mensajeEnviado:any={};

  
  mensaje: any;

  item$: Observable<any[]>;

  constructor(private authS: AuthService, private firestore: CloudFirestoreService, private router: Router, private chatSVC:ChatService) {

    this.idMesa = localStorage.getItem('idMesa')

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

  ngOnInit() {

  }




  back() {
    this.router.navigateByUrl('home-clientes')
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

    //this.firestore.Insert(this.idMesa, Object.assign({}, this.mensajeEnviado)) 

    
  }



}
