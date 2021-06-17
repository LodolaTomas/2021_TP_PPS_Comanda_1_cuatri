import { Component, Input, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-picture-config-modal',
  templateUrl: './picture-config-modal.component.html',
  styleUrls: ['./picture-config-modal.component.scss'],
})
export class PictureConfigModalComponent implements OnInit {

  @Input()fileName:string;

  constructor(params: NavParams,
              private modalController:ModalController) {
    //  console.log('UserId', params.get('userId'));
  }
  ngOnInit(): void {
  }
 confirm(){
  // using the injected ModalController this page
 // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'name': this.fileName
    });
}
}
