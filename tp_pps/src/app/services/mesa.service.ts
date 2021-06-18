import { Mesa } from './../clases/mesa';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class MesaService {

  rutaDeLaColeccionMesas = '/mesas';
  referenciaAlaColeccionMesas: AngularFirestoreCollection<Mesa>;

  constructor(private db: AngularFirestore) {
    this.referenciaAlaColeccionMesas = db.collection(
      this.rutaDeLaColeccionMesas
    );
   }
}
