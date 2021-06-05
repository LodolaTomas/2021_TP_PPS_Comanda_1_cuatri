import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SplashScreen } from '@capacitor/splash-screen';
@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss'],
})
export class SplashComponent implements OnInit {

  constructor(private router:Router) {
    
   }

  ngOnInit() {
    SplashScreen.hide()
    setTimeout(()=>{
      this.router.navigateByUrl('login')
    },4000)
  }

}
