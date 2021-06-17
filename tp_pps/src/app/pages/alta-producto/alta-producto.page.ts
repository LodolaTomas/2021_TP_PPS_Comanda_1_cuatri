import { Component, Input, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ModalController, NavParams  } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';
import { StorageService } from 'src/app/services/storage.service';
import { PictureConfigModalComponent } from 'src/app/components/picture-config-modal/picture-config-modal.component';

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
  generateQRCode(){
    this.value = this.generateGUID();
    this.showQR=true;
  }
  /**
   * Globally Unique IDentifie
   * @returns 
   */
  generateGUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
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
        component: PictureConfigModalComponent,
        cssClass: 'my-custom-class'
      });
      
      await modal.present();
      const { data } = await modal.onWillDismiss();

      let blobInfo = await this.makeFileIntoBlob(cameraInfo);
      let uploadInfo: any = await this.storage.uploadToFirebase(blobInfo," fotos_productos","user");

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
