import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { CloudFirestoreService } from 'src/app/services/cloud-firestore.service';
import { NotificationsService } from 'src/app/services/notifications.service';
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
              public alertController: AlertController,
              public notiSvc:NotificationsService) {
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
      // console.log(this.clientWaitingList);
      for (const clientEnEspera of this.clientWaitingList) {
        if(clientEnEspera.id != null){
          const usersFb = await this.fbService.GetByParameter("usuarios","id",clientEnEspera.id).get().toPromise();
          if(!usersFb.empty){
            var user = usersFb.docs[0].data();
            user.docRefId = usersFb.docs[0].id;//lo agrego para tener el ID del documento y updatear despues.
            this.userList.push(user);
          }
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
       this.notiSvc.notify("Cliente En la lista de espera ")
       this.actualizarEstadoMesa(data.mesa);
       this.asigarMesaAlUsuario(user,data.mesa);
       this.alert('success',"Cliente Asignado a la Mesa" + data.mesa  +"!");
       this.getAllUsers();
     }
  }
  /**
   * Actualiza la mesa a estado "OCUPADA"
   * @param numeroMesa Numero de mesa
   */
  async actualizarEstadoMesa(numeroMesa:number){
      const mesaFb = await this.fbService.GetByParameter("mesas","numero",numeroMesa).get().toPromise();
      let mesa = mesaFb.docs[0].data();
      mesa.ocupada=true;//actualiza el campo ocupada
      this.fbService.Update(mesa.id,"mesas",mesa).then(()=> this.ingresando=false);
  }
  /**
   * Actualiza el usuario asignandole el numero de mesa que ocupará
   * @param user Usuario
   * @param numeroMesa Numero de Mesa
   */
  async asigarMesaAlUsuario(user:any,numeroMesa:number){
    user.table = Number(numeroMesa);
    this.fbService.Update(user.docRefId,"usuarios",user).then(()=> this.ingresando=false);
}
/**
 * Actualiza el usuario de la lista de espera cambiandole el estado a "INGRESADO"
 * @param user Usuario
 */
async actualizarListadoDeEspera(user:any){
  const userFirebaseDoc = await this.fbService.GetByParameter("lista_espera_local","id",user.id).get().toPromise();//Aclaracion: lista_espera_local tiene ID, usuarios tiene UID como mismo dato
  let userDoc = userFirebaseDoc.docs[0].data();
  userDoc.status='ingresado';
  this.notiSvc.notify("Cliente En la lista de espera ")
  this.fbService.Update(userFirebaseDoc.docs[0].id,"lista_espera_local",userDoc).then(()=> this.ingresando=false);
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
