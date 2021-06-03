import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ModalController, NavParams  } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';

@Component({
  selector: 'app-alta-producto',
  templateUrl: './alta-producto.page.html',
  styleUrls: ['./alta-producto.page.scss'],
})
export class AltaProductoPage implements OnInit {
  listaFotos: any;
  usuario: any;
  progress: boolean;

  constructor(private camera: Camera,
              private modalController: ModalController,
              private file: File) { }

  ngOnInit() {
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
        component: "",
        cssClass: 'my-custom-class'
      });
      
      await modal.present();
      const { data } = await modal.onWillDismiss();

      let blobInfo = await this.makeFileIntoBlob(cameraInfo);
      let uploadInfo: any = await this.uploadToFirebase(blobInfo,data.nombre);
      // let user = this.service.getCurrentUserId();
      // let new_image = new Image(this.usuario, blobInfo['fileName'], 0);
      // this.fservice.InsertUsuarioFoto({usuario:this.usuario ,url:uploadInfo, fecha_creacion: new Date(),likes:0, dislikes:0 },this.tematica);

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
  uploadToFirebase(_imageBlobInfo,nombre) {
    this.progress = true;
    const context = this;
    const newDate = new Date();
    _imageBlobInfo.fileName = nombre + "_" + newDate.getDate()+"-"+newDate.getMonth()+"-"+newDate.getFullYear();
    // return new Promise((resolve, reject) => {
    //   let fileRef = this.storage.ref("relevamiento_visual/" + _imageBlobInfo.fileName);
    //   let uploadTask = fileRef.put(_imageBlobInfo.imgBlob);

    //   uploadTask.task.on(
    //     "state_changed",
    //     (_snapshot: any) => {
    //       this.progress = true;
    //     },
    //     _error => {
    //       // this.alertSerive.create(_error.message);
    //       alert(_error.message);
    //       reject(_error);
    //     },
    //     () => {
    //       resolve(uploadTask.snapshotChanges);
    //     }
    //   );
    //   uploadTask.snapshotChanges()
    //     .pipe(
    //       finalize(() => {
    //         fileRef.getDownloadURL().subscribe(url => {
    //           this.listaFotos.push(url);
    //           this.fservice.InsertUsuarioFoto({usuario:this.usuario ,url:url, fecha_creacion: new Date(),likes:0, dislikes:0, name: _imageBlobInfo.fileName })
    //           .then((docRef)=> {
    //             context.fservice.UpdateIdFoto(docRef.id,this.tematica);
    //             this.progress = false
    //           });
    //         });
    //       })
    //     ).subscribe();
    // });
  }
}
@Component({
  selector: 'app-setPictureName',
  template: `
  <ion-header>
  <ion-toolbar>
    <ion-title>Cambiar Nombre</ion-title>
  </ion-toolbar>
</ion-header>
<ion-content>
    <ion-item>
      <ion-input  name="name" type="text" placeholder="Nombre" required></ion-input>
    </ion-item>
  <div padding>
      <ion-button  class="ion-margin-start ion-margin-end ion-margin-bottom" color="primary" size="large" type="submit" expand="block">Confirmar</ion-button>
  </div>
</ion-content>
`,
  styleUrls: ['./alta-producto.page.scss'],
})
class PictureNameModal {

 constructor(params: NavParams) {
  //  console.log('UserId', params.get('userId'));
 }

}
