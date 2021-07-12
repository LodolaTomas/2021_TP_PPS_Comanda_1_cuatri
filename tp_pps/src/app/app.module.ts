import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
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
import { ShowfoodComponent } from './component/showfood/showfood.component';
import { CartComponent } from './component/cart/cart.component';


@NgModule({
  declarations: [AppComponent,ShowfoodComponent,CartComponent],
  entryComponents: [],
  imports: [BrowserModule , IonicModule.forRoot(), AppRoutingModule, AngularFireAuthModule, AngularFireModule.initializeApp(environment.firebaseConfig),IonicModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, File,  BarcodeScanner, LocalNotifications,
    { 
      provide: RouteReuseStrategy, 
      useClass: IonicRouteStrategy 
    }],
  bootstrap: [AppComponent],
})
export class AppModule {}
