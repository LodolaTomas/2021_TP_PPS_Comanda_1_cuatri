import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { CloudFirestoreService } from 'src/app/services/cloud-firestore.service';
import Swal, { SweetAlertIcon } from 'sweetalert2';
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
  idMesa: any;
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
    this.getUser();

    // fbService.GetAll("usuarios")
    //   .subscribe((data) => {
    //     this.usuarios = data;
    //     this.traerUsuario();
    //   });
  }

  async getUser() {
    const tokenUser = JSON.parse(localStorage.getItem('token'));
    this.fbService.GetByParameter("usuarios", "id", tokenUser.id).valueChanges()
    .subscribe(async (usersList)=>{
      if(usersList.length > 0){
        this.usuarioLog = usersList[0];
      }

     await this.fbService.GetByParameter("lista_espera_local","id",this.usuarioLog.id).get().toPromise().then((userCollection)=>{
       if(!userCollection.empty){
         this.existeUserEnListaEspera=true;
       }
       if(this.existeUserEnListaEspera){
         this.userEsperandoAsignacionDeMesa = this.usuarioLog.status =='esperando';
       }
   });
    });
  }
  ngOnInit() {
  }

  logout() {

    this.idMesa = localStorage.removeItem('idMesa')
    this.authS.LogOutCurrentUser()
    this.router.navigateByUrl('login')
  }

  openQR() {
    this.scanner.scan().then(res => {
      this.scannedBarCode = res;
      let scannedCode = res.text;
      const userWaitingList = { id: this.usuarioLog.id, status: "esperando", date: new Date() };
      this.fbService.Insert("lista_espera_local", userWaitingList)
        .then(() => {
          this.alert('success', "Agregado a la lista de espera!");
          this.existeUserEnListaEspera=true;
          this.userEsperandoAsignacionDeMesa=true;
        });
      this.displayQREspera = false;
      this.input = this.scannedBarCode["text"];
      this.notifSVC.notifyByProfile("Cliente En la lista de espera: ", this.usuarioLog, "admin")
      //     this.notificar({ name: 'Pepe Anonimo' });
    }).catch(err => {
      alert(err);
    });

  }

  // async traerUsuario() {
  //   this.authS.GetCurrentUser().then((response) => {
  //     if (response != null) {
  //       let user = this.usuarios.filter((u) => u.email == response.email);
  //       this.usuarioLog = user[0];
  
  //     }

  //   });
  // }


  openQRmesa() {
    this.displayQRmesa = false;
    this.carga = true;

    this.scanner.scan().then(res => {
      this.scannedBarCode = res;
      console.log(res);

      this.idMesa = this.scannedBarCode["text"];
      localStorage.setItem('idMesa', this.idMesa);
      this.actionsMesa =true;
    }).catch(err => {
      alert(err);
    });

  }

  consultar() {
    console.log(this.idMesa)
  
    this.router.navigateByUrl('consultas')


  }


  cartfood() {
    this.router.navigateByUrl('cartfood')
  }


  
  BTNjuegos() {
    this.router.navigateByUrl('juegos')
  }


  
  BTNencuesta() {
    this.router.navigateByUrl('encuesta')
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
