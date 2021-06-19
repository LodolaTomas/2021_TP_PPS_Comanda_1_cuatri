import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';


import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { environment } from './../environments/environment';

import { Camera } from '@ionic-native/camera/ngx';

import { File } from '@ionic-native/file/ngx';

import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';

import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [NgxQRCodeModule,BrowserModule, BarcodeScanner ,IonicModule.forRoot(), AppRoutingModule, AngularFireAuthModule, AngularFireModule.initializeApp(environment.firebaseConfig)],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, Camera, File],
  bootstrap: [AppComponent],
})
export class AppModule {}
