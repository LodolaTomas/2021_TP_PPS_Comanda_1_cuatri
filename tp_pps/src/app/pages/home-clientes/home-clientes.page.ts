import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { CloudFirestoreService } from 'src/app/services/cloud-firestore.service';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { NotificationsService } from 'src/app/services/notifications.service';

@Component({
  selector: 'app-home-clientes',
  templateUrl: './home-clientes.page.html',
  styleUrls: ['./home-clientes.page.scss'],
})
export class HomeClientesPage implements OnInit {

  navigate: any;
  encodedData: any;
  scannedBarCode: {};
  input: any;
  cliente: any;
  displayQREspera: boolean = true;
  numeroMesa: number = 5;
  displayQRmesa: boolean = true;
  actionsMesa: boolean = false;
  carga: boolean = false;
  existeUserEnListaEspera:boolean = false;
  userEsperandoAsignacionDeMesa:boolean=true;

  public usuarios: any = []
  public usuarioLog: any = {}

  //barcodeScannerOptions: BarcodeScannerOptions;

  constructor(private authS: AuthService,
    private router: Router,
    private scanner: BarcodeScanner,
    private fbService: CloudFirestoreService,
    private notifSVC: NotificationsService) {
    this.sideMenu();
    this.traerUsuario();
  }
  ngOnInit() {
  }
  sideMenu() {
    this.navigate =
      [
        {
          title: "Escaneo de Entrada",
          // url   : "/alta-producto",
          icon: "qr-code"
        }
        ,
        {
          title: "Historial Encuesta",
          // url   : "/alta-mesa",
          icon: "book-outline"
        }
      ]
  }
  logout() {
    
    this.authS.LogOutCurrentUser()
    this.router.navigateByUrl('login')
  }

  openQR() {

    console.log("QR!")
    this.scanner.scan().then(res => {
      this.scannedBarCode = res;
      console.log(res);
      let scannedCode = res.text;
      const userWaitingList = { id: this.usuarioLog.uid, status: "esperando", date: new Date() };
      this.fbService.Insert("lista_espera_local", userWaitingList)
        .then((val) => {
          this.alert('success', "Agregado a la lista de espera!");
        });
      this.displayQREspera = false;
      this.input = this.scannedBarCode["text"];
      // this.notifSVC.notifyByProfile("En la lista de espera: ", this.usuarioLog, "admin")
      this.notifSVC.notify("Cliente en lista de espera");
      //  this.notificar({ name: 'Pepe Anonimo' });
    }).catch(err => {
      alert(err);
    });

  }

   traerUsuario() {
      this.authS.getCurrentUser2((user)=>{
      if (user != null) {
        this.fbService.GetByParameter("usuarios","uid",user.uid).get().toPromise().then((userCollection)=>{
           if(!userCollection.empty){
             this.usuarioLog.uid = userCollection.docs[0].data().uid;
             this.existeUserEnListaEspera=true;
           }
           if(this.existeUserEnListaEspera){
             this.userEsperandoAsignacionDeMesa = this.usuarioLog.status =='esperando';
           }
         });
       }
     });
    
  }


  // openQRmesa() {
  //   this.displayQRmesa = false;
  //   this.carga = true;
  //   console.log("QR!")
  //   this.scanner.scan().then(res => {
  //     this.scannedBarCode = res;
  //     console.log(res);
  //     let scannedCode = res.text;
  //     const userWaitList = { id: this.cliente.uid, status: "esperando", date: new Date() };
  //     this.fbService.Insert("lista_espera_local", userWaitList)
  //       .then((val) => {
  //         this.displayQRmesa = false;
  //         this.actionsMesa = true;
  //         this.carga = false;
  //       });

  //     this.input = this.scannedBarCode["text"];

  //   }).catch(err => {
  //     alert(err);
  //   });

  // }




  
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
  cartfood() {
    this.router.navigateByUrl('cartfood')
  }

}
