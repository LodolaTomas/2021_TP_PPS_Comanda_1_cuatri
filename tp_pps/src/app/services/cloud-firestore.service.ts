import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {map} from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class CloudFirestoreService {

  constructor(private cloudFireStore:AngularFirestore,
              private storage:AngularFireStorage) {}

      Insert(collectionName:string,data:any) {
          return this.cloudFireStore.collection(collectionName).add({...data});
      }

      GetAll(collectionName:string){
          return this.cloudFireStore.collection(collectionName).snapshotChanges().pipe(
            map( actions=> 
              actions.map(a=>{
                const data = a.payload.doc.data();
                const id = a.payload.doc.id;
                return data;
              }))
          );
      }
      Update(id: string, collectionName: string, data:any) {
        return this.cloudFireStore.collection(collectionName).doc(id).update({...data}); 
      }
}
