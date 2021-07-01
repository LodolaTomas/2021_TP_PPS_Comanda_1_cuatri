import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { CloudFirestoreService } from 'src/app/services/cloud-firestore.service';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { ModalPage } from '../modal/modal.page';

@Component({
  selector: 'app-lista-espera-mesas',
  templateUrl: './lista-espera-mesas.page.html',
  styleUrls: ['./lista-espera-mesas.page.scss'],
})
export class ListaEsperaMesasPage implements OnInit {

  clientWaitingList:any[]=[]; 
  userList:any[]=[];
  public ingresando: boolean;

  constructor(private fbService:CloudFirestoreService,
              private modalController: ModalController,
              public alertController: AlertController) {
    this.getAllUsers();
    var date = new Date();
    date.toLocaleTimeString()
  }
  ngOnInit() {
  }
  async getAllUsers(){
    this.clientWaitingList=[];
    this.userList=[];
    this.ingresando=true;
      const usersWaitingFb = await this.fbService.GetByParameter("lista_espera_local","status","esperando").get().toPromise();
      usersWaitingFb.docs.forEach(item=> this.clientWaitingList.push(item.data()));
      for (const client of this.clientWaitingList) {
        const usersFb = await this.fbService.GetByParameter("usuarios","uid",client.uid).get().toPromise();
        if(!usersFb.empty){
          usersFb.docs.forEach(userData=> {
            this.userList.push(userData);
          });
        }
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
     if(data){
       this.ingresando=true;
       this.actualizarListadoDeEspera(user);
       this.actualizarEstadoMesa(data.mesa);
       this.asigarMesaAlUsuario(user,data.mesa);
       this.alert('success',"Cliente Asignado a la Mesa" + data.mesa  +"!");
       this.getAllUsers();
     }
  }
  async actualizarEstadoMesa(numeroMesa:number){
      const mesaFb = await this.fbService.GetByParameter("mesas","numero",numeroMesa).get().toPromise();
      let mesa = mesaFb.docs[0].data();
      mesa.ocupada=true;//actualiza el campo ocupada
      this.fbService.Update(mesa.id,"mesas",mesa).then(()=> this.ingresando=false);
  }
  async asigarMesaAlUsuario(user:any,numeroMesa:number){
    const userFb = await this.fbService.GetByParameter("usuarios","uid",user.uid).get().toPromise();
    userFb.docs[0].data().mesa = numeroMesa;
    console.log(userFb.docs[0]);
}
async actualizarListadoDeEspera(user:any){
  console.log(user)
  user.status ="ingresado";

  this.fbService.Update(user.uid,"lista_espera_local",user).then(()=> this.ingresando=false);
}
  async presentAlert(message:string, title:string, isError:boolean){
        /*** ALERTS ***/
        const alert = await this.alertController.create({
          header: title,
          message: message,
          buttons: ['OK']
        });
  
        await alert.present();
        let result = await alert.onDidDismiss();
  }
  alert(icon: SweetAlertIcon, text: string) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'bottom',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    
    Toast.fire({
      icon: icon,
      title: text
    })
  }
}
