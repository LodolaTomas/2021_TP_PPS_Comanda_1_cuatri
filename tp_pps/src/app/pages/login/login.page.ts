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
      this.router.navigateByUrl('/home');
    }
  }

  public submit() {
    //console.log(this.registrationForm.value);
  }







}
