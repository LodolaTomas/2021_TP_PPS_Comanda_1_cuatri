import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import * as firebase from 'firebase';
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
    return new Promise((resolve) => {
      let hora = new Date().getTime();//obtengo hora actual
      let ubicacion = path + hora;//le digo la ubicacion de la foto en el firebaseStorage
      let ref = firebase.default.storage().ref(ubicacion);
      ref.putString(file, 'data_url', {
        contentType: 'image/jpeg'
      }).then(() => {
        let storages = firebase.default.storage();
        let storageRef = storages.ref();
        let spaceRef = storageRef.child(ubicacion);
        spaceRef.getDownloadURL().then(url => {
          resolve(url)
        })
      })
    })
  }

  uploadPhotoMesa(path: string, file: any) {
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
