import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CloudFirestoreService } from 'src/app/services/cloud-firestore.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
/**
 * Pagina que por el momento representa el modal de asignación de mesas a clientes
 */
export class ModalPage implements OnInit {

  listMesas:any[]=[];
  constructor(private modalController:ModalController,
              private fbService:CloudFirestoreService) { 
                this.getMesasDisponibles();
              }
  async getMesasDisponibles() {
    this.fbService.GetByParameter("mesas","ocupada",false).valueChanges().subscribe((mesas)=>{
      this.listMesas = mesas;
    })
  }

  ngOnInit() {
  }
  dismiss(numeroDeMesa:number) {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'mesa': numeroDeMesa
    });
  }
}
