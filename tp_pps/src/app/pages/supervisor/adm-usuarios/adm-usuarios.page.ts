
import { CloudFirestoreService } from './../../../services/cloud-firestore.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { toPublicName } from '@angular/compiler/src/i18n/serializers/xmb';

@Component({
  selector: 'app-adm-usuarios',
  templateUrl: './adm-usuarios.page.html',
  styleUrls: ['./adm-usuarios.page.scss'],
})
export class AdmUsuariosPage implements OnInit {

  public usuarios: any = []

  public verPendientes:boolean = false;
  public verAceptados:boolean = false;
  public verTodos:boolean = true;

  constructor(private authS: AuthService, private router: Router, private firestore: CloudFirestoreService) {

    firestore.GetAll("usuarios")
    .subscribe((data) => {
      this.usuarios = data;
      console.log(data)
    });

  }


  verAceptadosBTN(){
    if(this.verAceptados)
    {
      this.verAceptados =false;
    }
    else{
      this.verAceptados =true;
      this.verPendientes =false;
      this.verTodos =false;
    }

  }

  verTodosBTN(){
    if(this.verTodos)
    {
      this.verTodos =false;
    }
    else{
      this.verAceptados =false;
      this.verPendientes =false;
      this.verTodos =true;
    }
    
  }

  verPendientesBTN(){
    if(this.verPendientes)
    {
      this.verPendientes =false;
    }
    else{
      this.verAceptados =false;
      this.verPendientes =true;
      this.verTodos =false;
    }
    
  }

  ngOnInit() {


  }


  Aceptar(user)
  {
    let auxUser = user;
    user.estado = 'aceptado';

    this.firestore.Update(user.id, "usuarios", auxUser)

  }

  Rechazar(user){
    let auxUser = user;
    user.estado = 'rechazado';

    this.firestore.Update(user.id, "usuarios", auxUser)
  }

  back() {
    this.authS.LogOutCurrentUser()
    this.router.navigateByUrl('supervisor')
  }



}



