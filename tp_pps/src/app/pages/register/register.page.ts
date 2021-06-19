import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  isAnonimous:boolean = false;
  scannedBarCode: any;
  data: any;

  constructor(private router:Router, private barcodeScanner:BarcodeScanner) { 
    const state = this.router.getCurrentNavigation().extras.state;
    if (state != null) {
      this.isAnonimous = state.value == 'anonimo';
    }
  }

  ngOnInit() {
  }
  register(form) {

  }
  takePicture() {

  }
  openQR(){
    this.barcodeScanner.scan().then(res => {
      this.scannedBarCode = res;
      this.data = this.scannedBarCode["text"]
      console.log(this.data)
    }).catch(err => {
      alert(err);
    });
  }




}
