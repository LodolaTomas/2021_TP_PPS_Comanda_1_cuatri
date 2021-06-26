import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Camera, CameraResultType } from '@capacitor/camera';
import { ImagesService } from 'src/app/services/images.service';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { CloudFirestoreService } from 'src/app/services/cloud-firestore.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  isAnonimous: boolean = false;
  scannedBarCode: any;
  imageElement: any = undefined;
  flag = false;
  public cargando: boolean;
  constructor(private router: Router, private barcodeScanner: BarcodeScanner, private imgSrv: ImagesService, private cloudSrv: CloudFirestoreService,private auth:AuthService) {
    this.cargando = false
    const state = this.router.getCurrentNavigation().extras.state;
    if (state != null) {
      this.isAnonimous = state.value == 'anonimo';
    }
  }

  ngOnInit() {
  }

  async register(form) {
    this.cargando = true;
    if (form.value.password !== form.value.confirm) {
      document.getElementById('password').setAttribute('value', '')
      document.getElementById('confirm').setAttribute('value', '')
      Swal.fire({
        icon: 'error',
        title: 'La contraseña no coinciden'
      })
    } else if (this.imageElement == undefined) {
      this.alert('error', 'Deber tomar o subir una foto');

    } else {
      let url = await this.imgSrv.uploadPhoto('/usuarios/', this.imageElement);
      let data: any;
      if (form.value.dni == undefined) {
        data = { 'name': form.value.name, 'image': url };
      } else {
        data = { 'name': form.value.name, 'lastname': form.value.lastname, 'DNI': form.value.dni, 'password': form.value.password, 'email':form.value.email,'perfil': 'cliente', 'estado': 'pendiente', 'image': url };
      }
      this.cloudSrv.Insert('/usuarios/', data)
      console.log(data)
      form.reset();
      this.auth.onRegister(data).then(()=>this.alert('success', 'Registro exitoso'))
      this.cargando = false;
    }

  }



  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      promptLabelHeader: 'Foto',
      promptLabelPhoto: 'Buscar de la Galería',
      promptLabelPicture: 'Tomar una Foto',
      promptLabelCancel: 'Cancelar',
      saveToGallery: true
    });
    this.imageElement = image.dataUrl;//muestro la foto para que previsualize el cliente
  }


  openQR() {
    this.barcodeScanner.scan({ formats: "PDF_417" }).then(res => {
      this.scannedBarCode = res;
      console.log(res)
      let userQR = this.scannedBarCode["text"]
      let data = userQR.split("@");
      console.log(data)
      document.getElementById('name').setAttribute('value', data[2])
      document.getElementById('lastname').setAttribute('value', data[1])
      document.getElementById('DNI').setAttribute('value', data[4])
    }).catch(err => {
      alert(err);
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



}
