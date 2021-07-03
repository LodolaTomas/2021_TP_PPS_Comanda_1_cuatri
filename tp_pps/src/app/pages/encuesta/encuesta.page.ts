import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CloudFirestoreService } from 'src/app/services/cloud-firestore.service';
import { Camera, CameraResultType } from '@capacitor/camera';
import { ImagesService } from 'src/app/services/images.service';
import { File } from '@ionic-native/file/ngx';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.page.html',
  styleUrls: ['./encuesta.page.scss'],
})
export class EncuestaPage implements OnInit {

  public usuarioLog: any = {}
  public usuarios: any = []

  listaFotos: any;
  usuario: any;
  progress: boolean;
  showQR: boolean = false;
  imageElement: Array<any> = []
  title = 'app';
  elementType = 'url';
  public cargando:boolean;

  constructor(private firestore: CloudFirestoreService, private router: Router,    private file: File,) {

    
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

  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 50,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      promptLabelHeader: 'Foto',
      promptLabelPhoto: 'Buscar de la Galería',
      promptLabelPicture: 'Tomar una Foto',
      promptLabelCancel: 'Cancelar',
      saveToGallery: true,
    });
    if (this.imageElement.length <= 2) {
      this.imageElement.push(image.dataUrl);//muestro la foto para que previsualize el cliente
    }

  }

  enviarEncuesta()
  {
    this.alert('success','¡Gracias por responder!')

  }



  alert(icon: SweetAlertIcon, text: string) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'center',
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
}
  
