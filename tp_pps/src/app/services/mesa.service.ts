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

   agregarMesa(mesa: Mesa) {

    let idDate = new Date();
    let id = idDate.getTime().toString();

    this.db
      .collection('mesas')
      .doc(id)
      .set({
        id: id,
        cantidadComensales: mesa.cantidadComensales,
        tipo: mesa.tipo,
        foto: mesa.foto,
        //datosExtra: Object.assign({}, historia.datosExtra),
      });
  }

}
