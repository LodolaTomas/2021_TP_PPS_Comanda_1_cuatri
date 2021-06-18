import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import {CameraResultType, CameraSource } from '@capacitor/camera';
import { Plugins} from '@capacitor/core';
import * as firebase from 'firebase';
const { Camera } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class ImagesService {
  imagenes: any[];
  rutaDeLaColeccion="/fotos";
  referenciaAlaColeccion:AngularFireList<any>

  constructor(private bd: AngularFireDatabase) {
    this.referenciaAlaColeccion = bd.list(this.rutaDeLaColeccion);
  }

  async sacarFoto(ruta:string) {//saco foto y la subo al firebase Storage
    let capturedPhoto = await Camera.getPhoto({
      quality: 100,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
      webUseInput: true,
    });//capturo la Foto

    ///los `let` setean algunas cosas
    let dataUrl = capturedPhoto.dataUrl;//obtengo el dataUrl
    let hora = new Date().getTime();//obtengo hora actual
    let ubicacion = ruta + hora;//le digo la ubicacion de la foto en el firebaseStorage
    let ref = firebase.default.storage().ref(ubicacion);//asigno la ubicacion
    
    ref.putString(dataUrl, 'data_url',{
      contentType: 'image/jpeg',
    }).then(()=>{
      let aux;

      aux = this.guardarReferencia(ubicacion);

      console.log(aux)

    })
  }

  

  guardarReferencia(pReferencia: string){
    let storage = firebase.default.storage();
    let storageRef = storage.ref();
    let spaceRef = storageRef.child(pReferencia);
    spaceRef.getDownloadURL().then(url => {
      let urlFoto = url;
      
      return urlFoto;
    });
  }


    
}