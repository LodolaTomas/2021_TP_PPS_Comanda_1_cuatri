import { ImagesService } from './../../services/images.service';
import { Mesa } from './../../clases/mesa';
import { MesaService } from './../../services/mesa.service';
import { Component, OnInit } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import * as firebase from 'firebase';
import { AngularFireStorage } from '@angular/fire/storage';


@Component({
  selector: 'app-alta-mesa',
  templateUrl: './alta-mesa.page.html',
  styleUrls: ['./alta-mesa.page.scss'],
})
export class AltaMesaPage implements OnInit {

  public cantidadComensales: number;

  public tipoMesa: string;

  public mesa: Mesa

  public buttonColor1: string = "primary";
  public buttonColor2: string = "primary";
  public buttonColor3: string = "primary";
  public buttonColor4: string = "warning";

  public foto: any;
  public fotoCargada: any;



  constructor(private mesaSVC: MesaService, private storage: AngularFireStorage, private imgSVC: ImagesService) {
    this.cantidadComensales = 0;
    this.tipoMesa = "normal"
    this.mesa = new Mesa()
  }

  ngOnInit() { }

  agregarComensal() {
    this.cantidadComensales += 1;
  }

  retirarComensal() {
    if (this.cantidadComensales <= 1) {
      this.cantidadComensales = 1;
    } else {
      this.cantidadComensales -= 1;
    }
  }

  seleccionarTipoDeMesa(tipo: string) {

    switch (tipo) {
      case 'vip':
        this.buttonColor1 = "warning";
        this.buttonColor2 = "primary";
        this.buttonColor3 = "primary";
        this.buttonColor4 = "primary";
        this.tipoMesa = "vip"
        break;
      case 'discapacitados':
        this.buttonColor1 = "primary";
        this.buttonColor2 = "warning";
        this.buttonColor3 = "primary";
        this.buttonColor4 = "primary";
        this.tipoMesa = "discapacitados"
        break;
      case 'ninios':
        this.buttonColor1 = "primary";
        this.buttonColor2 = "primary";
        this.buttonColor3 = "warning";
        this.buttonColor4 = "primary";
        this.tipoMesa = "ninios"
        break;
      default:
        this.tipoMesa = "normal"
        this.buttonColor1 = "primary";
        this.buttonColor2 = "primary";
        this.buttonColor3 = "primary";
        this.buttonColor4 = "warning";
        break;
    }
  }
  onUpload1($event) {
    console.log($event.target.files[0])
    this.foto = $event.target.files[0];
  }
  

  async agregarMesa() {

    this.mesa.cantidadComensales = this.cantidadComensales;
    this.mesa.tipo = this.tipoMesa;
    this.foto= await this.imgSVC.uploadPhoto('/mesas/',this.foto)
    this.mesa.foto = this.foto;
    this.mesaSVC.agregarMesa(this.mesa)
    this.alert('success', 'Mesa agreagada al restaurante')
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

}
