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
  cliente: any;
  displayQREspera: boolean = true;
  numeroMesa: number = 5;
  displayQRmesa: boolean = true;
  actionsMesa: boolean = false;
  carga: boolean = false;

  public usuarios: any = []
  public usuarioLog: any = {}

  //barcodeScannerOptions: BarcodeScannerOptions;

  constructor(private authS: AuthService,
    private router: Router,
    private scanner: BarcodeScanner,
    private fbService: CloudFirestoreService,
    private notifSVC: NotificationsService) {
    this.sideMenu();
    this.getUser();

    fbService.GetAll("usuarios")
      .subscribe((data) => {
        this.usuarios = data;
        this.traerUsuario();
        console.log(this.usuarios)
      });
  }

  async getUser() {

    var currentUser = { uid: "edb4z9BC3llciFBhEomB" };
    // var currentUser = await this.authS.GetCurrentUser();
    const fbCollection = await this.fbService.GetByParameter("usuarios", "id", currentUser.uid).get().toPromise();
    fbCollection.docs.forEach(d => this.cliente = d.data());
    console.log(fbCollection.docs[0].data());
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

    this.idMesa = localStorage.removeItem('idMesa')
    this.authS.LogOutCurrentUser()
    this.router.navigateByUrl('login')
  }

  openQR() {

    console.log("QR!")
    this.scanner.scan().then(res => {
      this.scannedBarCode = res;
      console.log(res);
      let scannedCode = res.text;
      const userWaitList = { id: this.cliente.id, status: "esperando", date: new Date() };
      this.fbService.Insert("lista_espera_local", userWaitList)
        .then((val) => {
          this.alert('success', "Agregado a la lista de espera!");
        });
      this.displayQREspera = false;
      this.input = this.scannedBarCode["text"];
      this.notifSVC.notifyByProfile("En la lista de espera: ", this.usuarioLog, "admin")
      //     this.notificar({ name: 'Pepe Anonimo' });
    }).catch(err => {
      alert(err);
    });

  }

  async traerUsuario() {
    this.authS.GetCurrentUser().then((response) => {
      if (response != null) {
        let user = this.usuarios.filter((u) => u.email == response.email);
        this.usuarioLog = user[0];
        console.log(this.usuarioLog.perfil)

      }

    });
  }


  openQRmesa() {
    this.displayQRmesa = false;
    this.carga = true;
    console.log("QR!")
    this.scanner.scan().then(res => {
      this.scannedBarCode = res;
      console.log(res);

      this.idMesa = this.scannedBarCode["text"];
      localStorage.setItem('idMesa', this.idMesa)
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
