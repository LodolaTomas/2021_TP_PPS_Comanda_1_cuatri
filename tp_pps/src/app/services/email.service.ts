import emailjs, { EmailJSResponseStatus } from 'emailjs-com';
import { Injectable } from '@angular/core';
import { init } from "emailjs-com";
init("user_shSWtSMKYJppZ79GjRSIF");

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor() { }

  sendEmail(usuario: any, mensaje: string) {

    let templateParams = {
      nombre_cliente: usuario.name,
      Mensaje: mensaje,
      email_cliente: usuario.correo
    };

    emailjs.send("service_cyp", "template_email", templateParams)
      .then(res => console.log("Correo enviado.", res.status, res.text))
      .catch(error => console.log("Error al enviar.", error));
  }

}
