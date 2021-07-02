import { CloudFirestoreService } from 'src/app/services/cloud-firestore.service';
import { Injectable } from '@angular/core';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {


  public usuarios: any = []

  constructor(private localNotifications: LocalNotifications) {

  }


  notifyByProfile(message: string, userLoged: any, target: string) {
    //target es el perfil a notificar, userLoged el usuario logeado, para saber si debe notificarlo
    if (target == userLoged.perfil) { //target == userLoged.perfil
      console.log(userLoged.perfil)
      console.log(target)
      console.log(userLoged.perfil + " " + message)
      this.notify(message) //La notifiacion recibe un mensaje

    }
  }



  notify(message: string) {
    this.localNotifications.schedule({
      id: 1,
      text: message,
      sound: 'file://android/app/src/main/res/raw/sound.mp3',
    });
  }

}



