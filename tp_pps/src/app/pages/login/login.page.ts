import { User } from './../../shared/User.class';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CloudFirestoreService } from 'src/app/services/cloud-firestore.service';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  miFormulario: FormGroup;

  @Input() user: User = new User();

  public ingresando: boolean;

  users = [
    { "email": "admin@yopmail.com", "clave": "123456" },
    { "email": "metre@yopmail.com", "clave": "123456" },
    { "email": "cliente@yopmail.com", "clave": "123456" },
    { "email": "cocinero@yopmail.com", "clave": "123456" },
    { "email": "supervisor@yopmail.com", "clave": "123456" }
  ];

  constructor(private formBuilder: FormBuilder, private router: Router, private authSvc: AuthService, private cloudSrv: CloudFirestoreService) {
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
    const subscription = this.cloudSrv.GetByParameter('usuarios', 'correo', this.user.email).valueChanges().subscribe(async element=>{
    if (element[0].estado == 'pendiente') {
      this.alert('warning', 'Su cuenta esta pendiente')
    } else if (element[0].estado == 'rechazado') {
      this.alert('error', 'Su cuenta ah sido rechazada')
    } else {
      let user = await this.authSvc.onLogin(this.user);
      if (user) {
        this.authSvc.currentUser = this.user;
        if (this.user.email == 'supervisor@yopmail.com') {
          this.router.navigateByUrl('/supervisor');
        }
        else {
          this.router.navigateByUrl('/home');
        }
      }
    }
  });
  setTimeout(() => {
    if(subscription)
      subscription.unsubscribe();
  }, 1000);
  }

  public submit() {
    //console.log(this.registrationForm.value);
  }

  public LoginFast(id: number) {

    this.miFormulario.controls['email'].setValue(this.users[id].email);
    this.miFormulario.controls['clave'].setValue(this.users[id].clave);

  }


  alert(icon: SweetAlertIcon, text: string) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'bottom',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,

      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })

    Toast.fire({
      icon: icon,
      title: text
    })
  }






}
