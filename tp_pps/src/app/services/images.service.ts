import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { CameraResultType, CameraSource } from '@capacitor/camera';
import { Plugins } from '@capacitor/core';
import * as firebase from 'firebase';
const { Camera } = Plugins;
import { AngularFireStorage } from '@angular/fire/storage';
@Injectable({
  providedIn: 'root'
})
export class ImagesService {
  imagenes: any[];
  rutaDeLaColeccion = "/fotos";
  referenciaAlaColeccion: AngularFireList<any>

  constructor(private bd: AngularFireDatabase, private storage: AngularFireStorage,) {
    this.referenciaAlaColeccion = bd.list(this.rutaDeLaColeccion);
  }

  async sacarFoto(ruta: string) {//saco foto y la subo al firebase Storage
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

    ref.putString(dataUrl, 'data_url', {
      contentType: 'image/jpeg',
    }).then(() => {
      let aux;

      aux = this.guardarReferencia(ubicacion);

      console.log(aux)

    })
  }



  guardarReferencia(pReferencia: string) {
    let storage = firebase.default.storage();
    let storageRef = storage.ref();
    let spaceRef = storageRef.child(pReferencia);
    spaceRef.getDownloadURL().then(url => {
      let urlFoto = url;

      return urlFoto;
    });
  }

  uploadPhoto(path: string, file: any) {
    let hora = new Date().getTime();//obtengo hora actual
    let ubicacion = path + hora;//le digo la ubicacion de la foto en el firebaseStorage
    return new Promise((resolve) => {
      this.storage.upload(ubicacion, file).then(() => {
      let storages = firebase.default.storage();
      let storageRef = storages.ref();
      let spaceRef = storageRef.child(ubicacion);
        spaceRef.getDownloadURL().then(url => {
          resolve(url)
        })
      })
    })
  }



}

/* var ref = firebase.default.database().ref(this.dbPath);
        var fotoName = especialista.imagen.name;
        let extencion = fotoName.split('.').pop()
        const filepath = `/especialistas/${response.uid}/perfil1.${extencion}`;
        const task = this.storage.upload(filepath, especialista.imagen).then(() => {
          let storages = firebase.default.storage();
          let storageRef = storages.ref();
          let spaceRef = storageRef.child(filepath);
          spaceRef.getDownloadURL().then(url => {
            especialista.imagen = url;
            ref.child(`${response.uid}`).set({
              nombre: especialista.nombre,
              apellido: especialista.apellido, edad: especialista.edad,
              dni: especialista.dni, especialidad: especialista.especialidad,
              email: especialista.email, password: especialista.password,
              imagen: `${especialista.imagen}`, alta: especialista.alta, dias: especialista.dias
            })
          });
           */