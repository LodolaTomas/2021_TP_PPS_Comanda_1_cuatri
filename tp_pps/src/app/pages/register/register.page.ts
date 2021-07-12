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
  takePhoto = false;
  public cargando: boolean;
  constructor(private router: Router, private barcodeScanner: BarcodeScanner, private imgSrv: ImagesService, private cloudSrv: CloudFirestoreService, private auth: AuthService) {
    this.cargando = false
    const state = this.router.getCurrentNavigation().extras.state;
    if (state != null) {
      this.isAnonimous = state.value == 'anonimo';
    }
  }

  ngOnInit() {

  }

  async register(form) {
    let flag = true;
    let data: any;
    this.cargando = true;
    let url = await this.imgSrv.uploadPhoto('/usuarios/', this.imageElement);
    let id = this.cloudSrv.ReturnFirestore().createId()
    if (form.value.dni == undefined) {
      flag = false
      data = { 'name': form.value.name, 'image': url, 'id': '', waitinglist: false, assignedtable: false, table: null, juego1: false, juego2: false, juego3: false,anonimus:true };
    } else {
      data = { 'name': form.value.name, 'lastname': form.value.lastname, 'DNI': form.value.dni, 'password': form.value.password, 'email': form.value.email, 'perfil': 'cliente', 'estado': 'pendiente', 'image': url, 'id': '', waitinglist: false, assignedtable: false, table: null, juego1: false, juego2: false, juego3: false };
    }

    if (this.isAnonimous) {
      flag = false;
      data.id = id;
      this.cloudSrv.InsertCustomID('usuarios', id, data).then(() => {
        this.cargando = false;
        localStorage.setItem('token', JSON.stringify(data));
        this.router.navigateByUrl('/home-clientes');
      });

    } else if (form.value.password !== form.value.confirm) {
      document.getElementById('password').setAttribute('value', '')
      document.getElementById('confirm').setAttribute('value', '')
      this.alert('error', 'La contraseña no coinciden')
      flag = false
      this.cargando = false;
    } else if (this.imageElement == undefined) {
      this.alert('error', 'Deber tomar o subir una foto');
      flag = false
      this.cargando = false;
    }

    if (flag == true) {
      this.cloudSrv.Insert('usuarios', data).then((docRef) => {
        this.auth.onRegister(data).then(() => this.alert('success', 'Registro exitoso')).catch(e => console.log(e));

        this.cargando = false;
        data.id = docRef.id;
        this.cloudSrv.Update(docRef.id, "usuarios", data);
        this.router.navigateByUrl('/home-clientes');

        this.takePhoto = false
        this.imageElement = undefined
        form.reset();
        this.cargando = false;
        this.router.navigateByUrl('login')
      }).catch(e => console.log(e))
    }

  }

  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 50,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      promptLabelHeader: 'Foto',
      promptLabelPhoto: 'Buscar de la Galería',
      promptLabelPicture: 'Tomar una Foto',
      promptLabelCancel: 'Cancelar',
      saveToGallery: true,

    });
    this.takePhoto = true;
    this.imageElement = image.dataUrl;//muestro la foto para que previsualize el cliente
  }


  openQR() {
    this.barcodeScanner.scan({ formats: "PDF_417" }).then(res => {
      this.scannedBarCode = res;
      console.log(res)
      let userQR = this.scannedBarCode["text"]
      let data = userQR.split("@");
      console.log(data)

      if (!(isNaN(Number(data[4])))) {
        document.getElementById('name').setAttribute('value', data[2])
        document.getElementById('lastname').setAttribute('value', data[1])
        document.getElementById('DNI').setAttribute('value', data[4])
      } else {
        document.getElementById('name').setAttribute('value', data[5])
        document.getElementById('lastname').setAttribute('value', data[4])
        document.getElementById('DNI').setAttribute('value', data[1].trim())
      }
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
