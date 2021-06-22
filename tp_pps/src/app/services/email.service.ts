import emailjs, { EmailJSResponseStatus } from 'emailjs-com';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor() { }

  sendEmail(usuario: any, mensaje: string) {
  
    let templateParams = {
      nombre_cliente: usuario.nombre,
      Mensaje: mensaje,
      email_cliente: usuario.correo  
    };

    emailjs.send("service_s2g1ax6","template_vwcjsmb", templateParams)
    .then(res => console.log("Correo enviado.", res.status, res.text))
    .catch(error => console.log("Error al enviar.", error));
  }

}
