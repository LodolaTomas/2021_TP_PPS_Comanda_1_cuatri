import { Component, Input, OnInit } from '@angular/core';
import { ModalController, NavParams  } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';
import { StorageService } from 'src/app/services/storage.service';
import { Camera, CameraResultType } from '@capacitor/camera';
import { CloudFirestoreService } from 'src/app/services/cloud-firestore.service';

@Component({
  selector: 'app-alta-producto',
  templateUrl: './alta-producto.page.html',
  styleUrls: ['./alta-producto.page.scss'],
})
export class AltaProductoPage implements OnInit {
  listaFotos: any;
  usuario: any;
  progress: boolean;
  showQR:boolean=false;
  imageElement:Array<any>=[]
  title = 'app';
  elementType = 'url';
  value = 'Techiediaries';
  constructor(
              private modalController: ModalController,
              private file: File,
              private storage:StorageService,
              private cloudSrv:CloudFirestoreService) { }

  ngOnInit() {
    
  }
  showQRCode(){
    this.showQR=true;
  }

  register(form:any)
  {

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
    if(this.imageElement.length<=2){
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
  
  @Input()fileName:string;

  constructor(params: NavParams,
              private modalController:ModalController) {
    //  console.log('UserId', params.get('userId'));
  }
 confirm(){
  // using the injected ModalController this page
 // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'name': this.fileName
    });
}
}
