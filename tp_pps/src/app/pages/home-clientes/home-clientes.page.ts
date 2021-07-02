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
      let scannedCode = res.text;
      const userWaitingList = { id: this.usuarioLog.uid, status: "esperando", date: new Date() };
      this.fbService.Insert("lista_espera_local", userWaitingList)
        .then((val) => {
          this.alert('success', "Agregado a la lista de espera!");
          this.existeUserEnListaEspera=true;
          this.userEsperandoAsignacionDeMesa=true;
        });
      this.displayQREspera = false;
      this.input = this.scannedBarCode["text"];
      // this.notifSVC.notifyByProfile("En la lista de espera: ", this.usuarioLog, "admin")
      this.notifSVC.notify("Nuevo Cliente en lista de espera");
      //  this.notificar({ name: 'Pepe Anonimo' });
    }).catch(err => {
      alert(err);
    });

  }

   traerUsuario() {
      this.authS.getCurrentUser2((user)=>{
      if (user != null) {
        this.fbService.GetByParameter("usuarios","uid",user.uid).valueChanges().subscribe((userCollection)=>{
           if(userCollection.length > 0){
             this.usuarioLog = userCollection[0];
           }
            this.fbService.GetByParameter("lista_espera_local","uid",user.uid).get().toPromise().then((userCollection)=>{
              if(!userCollection.empty){
                this.existeUserEnListaEspera=true;
              }
              if(this.existeUserEnListaEspera){
                this.userEsperandoAsignacionDeMesa = this.usuarioLog.status =='esperando';
              }
          });
         });
       }
     });
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
  cartfood() {
    this.router.navigateByUrl('cartfood')
  }

}
