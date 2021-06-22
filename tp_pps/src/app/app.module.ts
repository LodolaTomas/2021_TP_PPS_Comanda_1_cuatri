import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';


import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { environment } from './../environments/environment';


import { File } from '@ionic-native/file/ngx';

import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { PrimerLetraMayusPipe } from './pipes/primer-letra-mayus.pipe';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule , IonicModule.forRoot(), AppRoutingModule, AngularFireAuthModule, AngularFireModule.initializeApp(environment.firebaseConfig)],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, File,  BarcodeScanner,
    { 
      provide: RouteReuseStrategy, 
      useClass: IonicRouteStrategy 
    }],
  bootstrap: [AppComponent],
})
export class AppModule {}
