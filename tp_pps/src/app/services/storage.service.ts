import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize, switchMap } from 'rxjs/operators';
import { CloudFirestoreService } from './cloud-firestore.service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: AngularFireStorage,
              private firebaseService:CloudFirestoreService) { }

  uploadToFirebase(imageBlobInfo:any, dbName:string, user:string) {
    const context = this;
    const newDate = new Date();
    // fileName ="foto";
    var fileName = "foto" + "_" + newDate.getDate()+"-"+newDate.getMonth()+"-"+newDate.getFullYear() + "_" + newDate.getHours() +newDate.getMinutes() +newDate.getSeconds() + newDate.getMilliseconds()+".jpg";
    // return new Promise((resolve, reject) => {
      let fileRef = this.storage.ref(fileName);
      // const task = this.storage.upload(fileName,imageBlobInfo);
      
      let task = fileRef.put(imageBlobInfo);
      
      task.task.on(
        "state_changed",
        (_snapshot: any) => {
        },
        _error => {
          alert(_error.message);
        },
        () => {
          // resolve(uploadTask.snapshotChanges);
        }
      );

      task.snapshotChanges()
        .pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe(url => {
              // var data =  {user:user, url:url, created_date: new Date(), name: imageBlobInfo.fileName, id:"" };
              return url;
              // this.firebaseService.Insert(dbName,data)
              // .then((docRef)=> {
              //   data.id = docRef.id;
              //   context.firebaseService.Update(docRef.id,dbName,data);
              // });
            });
          })
        ).subscribe();
    // });
  }
}
