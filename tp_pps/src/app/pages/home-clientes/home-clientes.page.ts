import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { CloudFirestoreService } from 'src/app/services/cloud-firestore.service';

@Component({
  selector: 'app-home-clientes',
  templateUrl: './home-clientes.page.html',
  styleUrls: ['./home-clientes.page.scss'],
})
export class HomeClientesPage implements OnInit {

  navigate : any;
  encodedData: any;
  scannedBarCode: {};
  input: any;
  cliente:any;
  displayQREspera:boolean=true;

  //barcodeScannerOptions: BarcodeScannerOptions;

  constructor(private authS:AuthService, 
              private router:Router, 
              private scanner: BarcodeScanner,
              private fbService:CloudFirestoreService) {
      this.sideMenu();
      this.getUser();
  }
  async getUser(){
    // const state = this.router.getCurrentNavigation().extras.state;
    // if (state != null) {
      // const idUser = state.value;
      const idUser = "edb4z9BC3llciFBhEomB";
      const fbCollection = await this.fbService.GetByParameter("usuarios","id",idUser).get().toPromise();
      fbCollection.docs.forEach(d=> this.cliente = d.data());
      console.log(fbCollection.docs[0].data());
    //}
  }
  ngOnInit() {
  }
  sideMenu()
  {
    this.navigate =
    [
      {
        title : "Escaneo de Entrada",
        // url   : "/alta-producto",
        icon  : "qr-code"
      }
      ,
        {
          title : "Historial Encuesta",
          // url   : "/alta-mesa",
          icon  : "book-outline"
        }
    ]
  }
  logout()
  {
    this.authS.LogOutCurrentUser()
    this.router.navigateByUrl('login')
  }
  openQR() {
    console.log("QR!")
    this.scanner.scan({ formats: "PDF_417" }).then(res => {
      this.scannedBarCode = res;
      console.log(res);
      let scannedCode = res.text

      // let userQR = scannedCode.split("@");
      // console.log(userQR)
      const userWaitList = { id:this.cliente.id, status:"esperando" };
      this.fbService.Insert("lista_espera_local",userWaitList)
                    .then((val)=>{
                      alert("Agregado a la lista de espera!");
                    });
      this.displayQREspera=false;
      this.input = this.scannedBarCode["text"];
      // alert(this.input)
    }).catch(err => {
      alert(err);
    });

  }
}
