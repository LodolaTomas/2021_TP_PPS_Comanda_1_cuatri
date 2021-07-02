import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CloudFirestoreService } from 'src/app/services/cloud-firestore.service';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.page.html',
  styleUrls: ['./encuesta.page.scss'],
})
export class EncuestaPage implements OnInit {

  public usuarioLog: any = {}
  public usuarios: any = []

  constructor(private firestore: CloudFirestoreService, private router: Router) {
    this.usuarios = ''
   }



  async traerUsuario() {
    const fbCollection = await this.firestore.GetByParameter("usuarios", "email", this.usuarioLog.email).get().toPromise();
    const element = fbCollection.docs[0].data();
    this.usuarioLog = element
    localStorage.setItem('token', JSON.stringify(element));
  }
  ngOnInit() {
    this.usuarioLog = JSON.parse(localStorage.getItem('token'));
    this.traerUsuario()
    console.log(this.usuarioLog)
  }

  back() {
    this.router.navigateByUrl('home-clientes')
  }

  
}
