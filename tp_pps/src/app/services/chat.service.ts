import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database'

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  rutaDeLaDb = '/mensajes';
  referenciaAlaDb: AngularFireList<any>;

  constructor(private bd: AngularFireDatabase) { 
    this.referenciaAlaDb = bd.list(this.rutaDeLaDb);
  }

  Crear(mensaje:any):any
  {
  
    return this.referenciaAlaDb.push(mensaje);
  }

  ObtenerTodos():AngularFireList<any>
  {
    return this.referenciaAlaDb;
  }





}
