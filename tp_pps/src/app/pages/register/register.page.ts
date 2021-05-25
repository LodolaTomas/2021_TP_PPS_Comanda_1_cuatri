import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  isAnonimous:boolean = false;

  constructor(private router:Router) { 
    const state = this.router.getCurrentNavigation().extras.state;
    if(state!=null){
      this.isAnonimous = state.value == 'anonimo';
    }
  }

  ngOnInit() {
  }
  register(form){

  }
  takePicture(){

  }
  openQR(){

  }
}
