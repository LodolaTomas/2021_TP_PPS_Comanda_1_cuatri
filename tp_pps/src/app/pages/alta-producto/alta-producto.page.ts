import { Component, Input, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';
import { Camera, CameraResultType } from '@capacitor/camera';
import { CloudFirestoreService } from 'src/app/services/cloud-firestore.service';
import { ImagesService } from 'src/app/services/images.service';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Component({
  selector: 'app-alta-producto',
  templateUrl: './alta-producto.page.html',
  styleUrls: ['./alta-producto.page.scss'],
})
export class AltaProductoPage implements OnInit {
  listaFotos: any;
  usuario: any;
  progress: boolean;
  showQR: boolean = false;
  imageElement: Array<any> = []
  title = 'app';
  elementType = 'url';
  public cargando:boolean;

  constructor(private imgSrv: ImagesService,
    private file: File,
    private cloudSrv: CloudFirestoreService) { }

  ngOnInit() {

  }
  showQRCode() {
    this.showQR = true;
  }

  async register(form: any) {
    this.cargando = true;
    console.log(form.value)
    let flag = true;
    let data: any;

    let url = await this.imgSrv.uploadPhoto('/comida/', this.imageElement[0]);
    let url2 = await this.imgSrv.uploadPhoto('/comida/', this.imageElement[1]);
    let url3 = await this.imgSrv.uploadPhoto('/comida/', this.imageElement[2]);
    data = { 'name': form.value.name,'description': form.value.description,'elaboration_time':form.value.time,'price':form.value.price,'photos': [url,url2,url3],'quantity':1,'type':form.value.type,'id':'1' };
    if (this.imageElement.length < 2) {
      this.alert('error', 'Deber tomar o subir 3 fotos');
      flag = false;
    }

    if(flag==true){
      let customId=this.cloudSrv.ReturnFirestore().createId()
      data.id=customId;
      this.cloudSrv.InsertCustomID('productos',customId ,data).then(()=>{
        this.imageElement.splice(0,this.imageElement.length)
        form.reset();
            this.cargando = false;

        this.alert('success','Alta de producto Realizada')
      }).catch(e=>console.log(e))
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
    if (this.imageElement.length <= 2) {
      this.imageElement.push(image.dataUrl);//muestro la foto para que previsualize el cliente
    }

  }

  makeFileIntoBlob(_imagePath) {
    return new Promise((resolve, reject) => {
      let fileName = "";
      this.file
        .resolveLocalFilesystemUrl(_imagePath)
        .then(fileEntry => {
          let { name, nativeURL } = fileEntry;

          // get the path..
          let path = nativeURL.substring(0, nativeURL.lastIndexOf("/"));
          fileName = name;

          // we are provided the name, so now read the file into
          // a buffer
          return this.file.readAsArrayBuffer(path, name);
        })
        .then(buffer => {
          // get the buffer and make a blob to be saved
          let imgBlob = new Blob([buffer], {
            type: "image/jpeg"
          });
          resolve({
            fileName,
            imgBlob
          });
        })
        .catch(e => {
          alert(e.message);
          reject(e)
        });
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
@Component({
  selector: 'app-setPictureName',
  template: `
  <ion-header>
  <ion-toolbar>
    <ion-title>Ingresar Nombre Foto</ion-title>
  </ion-toolbar>
</ion-header>
<ion-content>
    <ion-item>
    <ion-label position="floating">Nombre</ion-label>
      <ion-input  [(ngModel)]="fileName" name="name" type="text" placeholder="Nombre" required></ion-input>
    </ion-item>
  <div padding>
      <ion-button expand="full" (click)="confirm()" class="ion-margin-start ion-margin-end ion-margin-bottom" color="primary" size="large" type="submit">Confirmar</ion-button>
  </div>
</ion-content>
`,
  styleUrls: ['./alta-producto.page.scss'],
})
class PictureNameModal {

  @Input() fileName: string;

  constructor(params: NavParams,
    private modalController: ModalController) {
  }
  confirm() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'name': this.fileName
    });
  }
}
