import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CloudFirestoreService } from 'src/app/services/cloud-firestore.service';
import { ModalPage } from '../modal/modal.page';

@Component({
  selector: 'app-lista-espera-mesas',
  templateUrl: './lista-espera-mesas.page.html',
  styleUrls: ['./lista-espera-mesas.page.scss'],
})
export class ListaEsperaMesasPage implements OnInit {

  clientListWaiting:any[]=[]; 
  userList:any[]=[];
  public ingresando: boolean;

  constructor(private fbService:CloudFirestoreService,
              private modalController: ModalController) {
    this.getAllUsers();
    var date = new Date();
    date.toLocaleTimeString()
  }
  ngOnInit() {
  }
  async getAllUsers(){
    this.clientListWaiting=[];
    this.userList=[];
    this.ingresando=true;
      const usersWaitingFb = await this.fbService.GetByParameter("lista_espera_local","status","esperando").get().toPromise();
      usersWaitingFb.docs.forEach(d=> this.clientListWaiting.push(d.data()));
      for (const client of this.clientListWaiting) {
        const usersFb = await this.fbService.GetByParameter("usuarios","id",client.idUsuario).get().toPromise();
        usersFb.docs.forEach(d=> {
          var newUser ={ nombre:"",fecha:null, idUsuario:""};
          newUser.fecha = client.fecha;
          newUser.nombre = d.data().nombre;
          newUser.idUsuario= client.idUsuario; 
          console.log(newUser);
          this.userList.push(newUser);
        } );
      }
      this.ingresando=false;
  }
  async presentModal(user) {
    const modal = await this.modalController.create({
      component: ModalPage,
      cssClass: 'my-custom-class'
    });
     await modal.present();

     const { data } = await modal.onWillDismiss();
     this.ingresando=true;
     user.status ="ingresado";
     this.fbService.Update(user.idUsuario,"lista_espera_local",user).then(()=> this.ingresando=false);
     alert("Cliente Asignado a la Mesa" + data.mesa  +"!");
     this.getAllUsers();
  }
}
