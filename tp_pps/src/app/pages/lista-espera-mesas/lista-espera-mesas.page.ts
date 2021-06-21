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

  clientListWaiting:any[]=[]; 
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
    const userFb = await this.fbService.GetByParameter("usuarios","id",user.idUsuario).get().toPromise();
    userFb.docs[0].data().mesa = numeroMesa;
}
async actualizarListadoDeEspera(user:any){
  user.status ="ingresado";
  this.fbService.Update(user.idUsuario,"lista_espera_local",user).then(()=> this.ingresando=false);
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
