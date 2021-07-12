import { Encuesta } from './../../clases/encuesta';
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
  range = 2
  emojis = ['😠', '😦', '😑', '😀', '😍'];
  listaFotos: any;
  usuario: any;
  progress: boolean;
  showQR: boolean = false;

  imageElement: any = undefined;
  flag = false;
  takePhoto = false;

  title = 'app';
  elementType = 'url';

  public cargando: boolean;
  public recomienda: any;
  public volverias: any;
  public probaste: any;
  public comentarios: any;

  public comidas: boolean = false;
  public bebidas: boolean = false;
  public postres: boolean = false;

  public probo = [
    { val: 'comidas', isChecked: false },
    { val: 'bebidas', isChecked: false },
    { val: 'postres', isChecked: false }
  ];


  public encuesta: Encuesta

  constructor(private imgSrv: ImagesService, private firestore: CloudFirestoreService, private router: Router, private file: File,) {

    this.encuesta = new Encuesta()
    this.usuarios = ''
  }



  async traerUsuario() {
    const fbCollection = await this.firestore.GetByParameter("usuarios", "email", this.usuarioLog).get().toPromise();
    const element = fbCollection.docs[0].data();
    this.usuarioLog = element
  }
  ngOnInit() {
    this.usuarioLog = JSON.parse(localStorage.getItem('token'));
    this.traerUsuario()
    console.log(this.usuarioLog)
  }

  back() {
    this.router.navigateByUrl('home-clientes')
  }

  setRam(value) {
    this.range = value;
  }

  async enviar() {


    if(this.imageElement  &&  this.range && this.volverias && this.recomienda && this.comentarios)
    {
    this.cargando = true
    let url = await this.imgSrv.uploadPhoto('/encuestas/', this.imageElement);
    let id = this.firestore.ReturnFirestore().createId()

    this.encuesta.id = id
    this.encuesta.satifaccion = this.range;
    this.encuesta.recomienda = this.recomienda;
    this.encuesta.volveria = this.volverias;
    this.encuesta.comentarios = this.comentarios;
    this.encuesta.probaste = this.probo;
    this.encuesta.foto = url;
    this.encuesta.cliente = this.usuarioLog
    this.encuesta.comidas=this.comidas;
    this.encuesta.bebidas=this.bebidas;
    this.encuesta.postres=this.postres;

    console.log(this.encuesta)
    
    this.firestore.InsertCustomID('encuestas', this.encuesta.id, Object.assign({}, this.encuesta))

    this.firestore.Update(this.usuarioLog.id, 'usuarios', {encuestado:true})

    console.log(this.encuesta)
    this.cargando = false

    

    this.alert('success','Garcias por responder');

    setTimeout(() => {
      this.router.navigateByUrl('home-clientes')
    }, 2000);



    }
    else{
    this.alert('error','campos vacios');
    }
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
    this.takePhoto = true;
    this.imageElement = image.dataUrl;//muestro la foto para que previsualize el cliente
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
      timerProgressBar: false,

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
  
