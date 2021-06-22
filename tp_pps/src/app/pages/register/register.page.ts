import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  isAnonimous: boolean = false;

  encodedData: any;
  scannedBarCode: {};
  input: any
  //barcodeScannerOptions: BarcodeScannerOptions;

  constructor(private router: Router, private scanner: BarcodeScanner) {
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

  
  public sendEmail(e: Event) {
    e.preventDefault();
    emailjs.sendForm('service_cyp', 'template_1anvcdt', e.target as HTMLFormElement, 'user_shSWtSMKYJppZ79GjRSIF')
      .then((result: EmailJSResponseStatus) => {
        console.log(result.text);
      }, (error) => { 
        console.log(error.text);
      });
  }



  openQR() {
    console.log("QR!")
    this.scanner.scan({ formats: "PDF_417" }).then(res => {
      this.scannedBarCode = res;
      console.log(res);
      let scannedCode = res.text

      let userQR = scannedCode.split("@");
      console.log(userQR)
      this.input = this.scannedBarCode["text"];
      alert(this.input)
    }).catch(err => {
      alert(err);
    });

  }




}