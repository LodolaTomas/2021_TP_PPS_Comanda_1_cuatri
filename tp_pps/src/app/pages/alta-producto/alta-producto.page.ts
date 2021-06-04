import { Component, Input, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ModalController, NavParams  } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';
import { StorageService } from 'src/app/services/storage.service';

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

  title = 'app';
  elementType = 'url';
  value = 'Techiediaries';

  constructor(private camera: Camera,
              private modalController: ModalController,
              private file: File,
              private storage:StorageService) { }

  ngOnInit() {
  }
  showQRCode(){
    this.showQR=true;
  }
  async takePicture(){
    const options: CameraOptions = {
      quality: 80,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    try {

      let cameraInfo = await this.camera.getPicture(options);
      
      const modal = await this.modalController.create({
        component: PictureNameModal,
        cssClass: 'my-custom-class'
      });
      
      await modal.present();
      const { data } = await modal.onWillDismiss();

      let blobInfo = await this.makeFileIntoBlob(cameraInfo);
      let uploadInfo: any = await this.storage.uploadToFirebase(blobInfo, data.nombre," fotos_productos");

    } catch (e) {
      console.log(e);
      alert(e);
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
