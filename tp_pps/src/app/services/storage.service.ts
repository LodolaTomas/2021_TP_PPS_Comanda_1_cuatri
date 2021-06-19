import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { CloudFirestoreService } from './cloud-firestore.service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: AngularFireStorage,
              private firebaseService:CloudFirestoreService) { }

  uploadToFirebase(imageBlobInfo:any, fileName:string, dbName:string) {
    const context = this;
    const newDate = new Date();
    imageBlobInfo.fileName = fileName + "_" + newDate.getDate()+"-"+newDate.getMonth()+"-"+newDate.getFullYear();
    return new Promise((resolve, reject) => {
      let fileRef = this.storage.ref("relevamiento_visual/" + imageBlobInfo.fileName);
      let uploadTask = fileRef.put(imageBlobInfo.imgBlob);

      uploadTask.task.on(
        "state_changed",
        (_snapshot: any) => {
        },
        _error => {
          alert(_error.message);
          reject(_error);
        },
        () => {
          resolve(uploadTask.snapshotChanges);
        }
      );
      uploadTask.snapshotChanges()
        .pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe(url => {
              var data =  {user:"prueba" , url:url, created_date: new Date(), name: imageBlobInfo.fileName, id:"" };
              this.firebaseService.Insert(dbName,data)
              .then((docRef)=> {
                data.id = docRef.id;
                context.firebaseService.Update(docRef.id,dbName,data);
              });
            });
          })
        ).subscribe();
    });
  }
}
