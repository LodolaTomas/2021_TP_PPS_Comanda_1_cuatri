import { CloudFirestoreService } from 'src/app/services/cloud-firestore.service';
import { Injectable } from '@angular/core';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {


  public usuarios: any = []
  public supervisores: any = []
  public metres: any = []
  public admins: any = []
  public clientes: any = []


  constructor(private localNotifications: LocalNotifications, private firestore: CloudFirestoreService) {

    this.usuarios = ''



    firestore.GetAll("usuarios")
      .subscribe((data) => {
        this.usuarios = data;
        console.log(data)
        this.getByProfile("supervisor", this.supervisores)
        // console.log(this.supervisores)
      });

  }



  getByProfile(target, arrayAux) {
    this.usuarios.forEach(uno => {

      if (uno.perfil == target) {
        arrayAux.push(uno)
      }

    });

  }





  notifyByProfile(user: any, message: string, userLoged: any, target: string) {

    console.log(userLoged.perfil)

    if (target == userLoged.perfil) {
      console.log("true")
      this.notify(user, message)

    }


  }

  notify(user: any, message: string) {
    this.localNotifications.schedule({
      id: 1,
      text: message + user.name,
      sound: 'file://android/app/src/main/res/raw/sound.mp3',
    });

  }

}



