import { User } from './../../shared/User.class';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  miFormulario: FormGroup;

  @Input() user: User = new User();

  public ingresando: boolean;

  users =[
    {"email":"admin@yopmail.com","clave":"123456"},
    {"email":"metre@yopmail.com","clave":"123456"},
    {"email":"cliente@yopmail.com","clave":"123456"},
    {"email":"cocinero@yopmail.com","clave":"123456"},
    {"email":"supervisor@yopmail.com","clave":"123456"}
  ];

  constructor(private formBuilder: FormBuilder, private router: Router, private authSvc: AuthService) {
    this.miFormulario = formBuilder.group({
      email: new FormControl(""),
      clave: new FormControl(""),
    })

    this.user.email = '';
    this.user.password = '';
    this.ingresando = false;


  }

  ngOnInit() {
  }

  autenticar(form) {
  }


  async onLogin() {
    this.user.email = this.miFormulario.value.email;
    this.user.password = this.miFormulario.value.clave;
    const user = await this.authSvc.onLogin(this.user);
    if (user) {
      this.authSvc.currentUser = this.user;
      console.log(this.authSvc.currentUser);
      
      if(this.user.email == 'supervisor@yopmail.com')
      {
        this.router.navigateByUrl('/supervisor');
      }
      else{
        this.router.navigateByUrl('/home');
      }

    }
  }

  public submit() {
    //console.log(this.registrationForm.value);
  }

  public LoginFast(id:number){

    this.miFormulario.controls['email'].setValue(this.users[id].email);
    this.miFormulario.controls['clave'].setValue(this.users[id].clave);

  }









}
