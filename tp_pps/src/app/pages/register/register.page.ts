import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Camera, CameraResultType } from '@capacitor/camera';
import { ImagesService } from 'src/app/services/images.service';
import { Capacitor } from '@capacitor/core';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  isAnonimous:boolean = false;
  scannedBarCode: any;
  data: any;
  imageElement:any;
  flag=false
  constructor(private router:Router, private barcodeScanner:BarcodeScanner,private imgSrv:ImagesService) { 
    const state = this.router.getCurrentNavigation().extras.state;
    if (state != null) {
      this.isAnonimous = state.value == 'anonimo';
    }
  }

  ngOnInit() {
  }
  register(form) {
    console.log(form.value)
  }

  async takePicture() {
    //capacitor 3.1 npm install @capacitor/camera
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        promptLabelHeader: 'Foto',
        promptLabelPhoto: 'Buscar de la Galería',
        promptLabelPicture: 'Tomar una Foto',
        promptLabelCancel: 'Cancelar',
        width:200,
        height:200,
        saveToGallery:true,

      });
      let imagen2=image
      this.imageElement = imagen2;//muestro la foto para que previsualize el cliente
      this.imgSrv.uploadPhoto('/cliente/',imagen2)
  }
  openQR(){
    this.barcodeScanner.scan().then(res => {
      this.scannedBarCode = res;
      this.data = this.scannedBarCode["text"]
      console.log(this.data)
    }).catch(err => {
      alert(err);
    });
  }




}
