import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  miFormulario:FormGroup;

  constructor(private formBuilder:FormBuilder) { 
    this.miFormulario = formBuilder.group({
      email: new FormControl(""),
      clave: new FormControl("")
    })
  }

  ngOnInit() {
  }

  autenticar(form){
  }
}
