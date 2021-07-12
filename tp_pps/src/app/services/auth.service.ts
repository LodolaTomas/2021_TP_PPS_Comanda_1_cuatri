
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../shared/User.class';

import { AlertController } from '@ionic/angular';

import Swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser: any;
  public isLogged: any = false;

  constructor(
    public afAuth: AngularFireAuth,
    public alertController: AlertController
  ) { 
    afAuth.authState.subscribe(user => (this.isLogged = user));
  }

  async onLogin(user: User) {
    try {
      return await this.afAuth.signInWithEmailAndPassword(user.email, user.password);
    } catch (error) {

      this.alert('error', 'Error, usuario invalido');
    }
  }

  async onRegister(user: User) {
    try {
      return await this.afAuth.createUserWithEmailAndPassword(user.email, user.password);
    }
    catch (error) {
      /*** ALERTS ***/
      const alert = await this.alertController.create({
        header: 'Alert Register',
        message: error,
        buttons: ['OK']
      });

      await alert.present();
      let result = await alert.onDidDismiss();
      console.log(result);
    }
  }

  GetCurrentUser() {
    return this.afAuth.currentUser;
  }

  LogOutCurrentUser() {
    this.afAuth.signOut();
  }


  alert(icon: SweetAlertIcon, text: string) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'bottom',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    
    Toast.fire({
      icon: icon,
      title: text
    })
  }

  registerAnonymously(){
    this.afAuth.signInAnonymously()
    .then((a) => {
      console.log("registerAnonymously",a);
      // Signed in..
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(error);
    });
  }
  getCurrentUser2(func){
     this.afAuth.onAuthStateChanged(func);
  }
}
