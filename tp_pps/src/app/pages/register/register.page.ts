import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ModalController } from '@ionic/angular';
import { PictureConfigModalComponent } from 'src/app/components/picture-config-modal/picture-config-modal.component';
import { StorageService } from 'src/app/services/storage.service';
import { File } from '@ionic-native/file/ngx';
import { FormGroup } from '@angular/forms';
import { User } from 'src/app/shared/User.class';
import { UserAnonimous } from 'src/app/shared/user-anonimous';
import { CloudFirestoreService } from 'src/app/services/cloud-firestore.service';

// import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Image } from 'src/app/shared/photo';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  isAnonimous:boolean = false;
  myForm: FormGroup;
  blobList:any[]=[];
  photos: Image[] = [];
  ingresando:boolean;

  constructor(private router:Router,
              private camera: Camera,
              private modalController: ModalController,
              private file: File,
              private firebase:CloudFirestoreService,
              private storage:StorageService) {

        const state = this.router.getCurrentNavigation().extras.state;
        if(state!=null){
          this.isAnonimous = state.value == 'anonimo';
        }
      }

  ngOnInit() {
  }
  async register(form:any){
    try {
      this.ingresando=true;
      let url;
      this.blobList.forEach(image => {
        //  var file = this.base64ToImage(image);
        //  this.makeFileIntoBlob(image);
        //  .then((value)=>{
          // alert(value);
        // }); 
      });
    if(this.isAnonimous){
      var newUserAnon = new UserAnonimous();
      newUserAnon.name = form.value.name;
      newUserAnon.picture = "url";
      newUserAnon.roll = "anonimo";
      this.firebase.Insert("anonimos",newUserAnon).then(()=>{
        this.ingresando=false;
        alert("bienvenido!");
        this.router.navigate(["home"]);
      })
    }
    else{
      // let uploadInfo: any =
    }
    // console.log(form.value.name);
    } catch (error) {
      alert(error);
    }
    
  }
  // takePicture(name){}
  async takePicture(form:any){

    try {
      // let userName = form.value.name;

      const options: CameraOptions = {
        quality: 80,
        destinationType: this.camera.DestinationType.FILE_URI,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
      };

      // let cameraInfo = await this.camera.getPicture(options);
      
      // const modal = await this.modalController.create({
      //   component: PictureConfigModalComponent,
      //   cssClass: 'my-custom-class'
      // });
      
      // await modal.present();
      // const { data } = await modal.onWillDismiss();

      // await this.makeFileIntoBlob(cameraInfo);
      
      var cameraInfo = await this.camera.getPicture(options);

      var blobInfo = await this.makeFileIntoBlob(cameraInfo);
      console.log("blobinfo",blobInfo);
      this.storage.uploadToFirebase(blobInfo,"fotos","asd");

      // const capturedPhoto = await Camera.getPhoto({
      //   resultType: CameraResultType.Uri,
      //   source: CameraSource.Camera,
      //   quality: 100
      // });
    
      // this.photos.unshift(new Image("soon...",capturedPhoto.webPath));

    } catch (e) {
      console.log(e);
      alert(e);
    }
  }
  async base64ToImage(dataURI) {
    
    const response = await fetch(dataURI);
    const blob = await response.blob();
    // URL.createObjectURL(new Blob([dataURI] , {type:'text/plain'}));
    return blob;
  }
  makeFileIntoBlob(_imagePath) {
    // INSTALL PLUGIN - cordova plugin add cordova-plugin-file
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
  
  openQR(){

  }
}
