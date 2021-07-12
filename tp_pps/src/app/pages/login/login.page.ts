import { NotificationsService } from './../../services/notifications.service';
import { User } from './../../shared/User.class';
import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
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

  public cargando: boolean = false;

  users = [
    { email: 'admin@yopmail.com', clave: '123456' },
    { email: 'metre@yopmail.com', clave: '123456' },
    { email: 'cliente@yopmail.com', clave: '123456' },
    { email: 'cocinero@yopmail.com', clave: '123456' },
    { email: 'supervisor@yopmail.com', clave: '123456' },
    { email: 'mozo@yopmail.com', clave: '123456' },
    { email: 'bartender@yopmail.com', clave: '123456' },

    { email: 'admin2@yopmail.com', clave: '123456' },
    { email: 'metre2@yopmail.com', clave: '123456' },
    { email: 'cliente2@yopmail.com', clave: '123456' },
    { email: 'cocinero2@yopmail.com', clave: '123456' },
    { email: 'supervisor2@yopmail.com', clave: '123456' },
    { email: 'mozo2@yopmail.com', clave: '123456' },
    { email: 'bartender2@yopmail.com', clave: '123456' },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authSvc: AuthService,
    private cloudSrv: CloudFirestoreService,
    private notificationsService: NotificationsService
  ) {
    this.miFormulario = formBuilder.group({
      email: new FormControl(''),
      clave: new FormControl(''),
    });
    this.user.email = '';
    this.user.password = '';
    this.ingresando = false;
  }

  ngOnInit() {}

  async onLogin() {
    this.cargando = true;
    this.user.email = this.miFormulario.value.email;
    this.user.password = this.miFormulario.value.clave;

    const fbCollection = await this.cloudSrv
      .GetByParameter('usuarios', 'email', this.user.email)
      .get()
      .toPromise();
    const element = fbCollection.docs[0].data();

    localStorage.setItem('token', JSON.stringify(this.user.email));

    if (element.estado == 'pendiente') {
      this.cargando = false;
      this.alert('warning', 'Su cuenta esta pendiente');
    } else if (element.estado == 'rechazado') {
      this.cargando = false;
      this.alert('error', 'Su cuenta ha sido rechazada');
    } else {
      let user = await this.authSvc.onLogin(this.user);
      if (user) {
        this.authSvc.currentUser = this.user;
        if (this.user.email == 'supervisor@yopmail.com') {
          this.cargando = false;
          this.router.navigateByUrl('/supervisor');
          this.miFormulario.reset();
        } else if (this.user.email == 'admin@yopmail.com') {
          this.cargando = false;
          this.router.navigateByUrl('/home');
          this.miFormulario.reset();
        } else if (this.user.email == 'metre@yopmail.com') {
          this.cargando = false;
          this.router.navigateByUrl('/metre');
          this.miFormulario.reset();
        } else if (this.user.email == 'mozo@yopmail.com') {
          this.cargando = false;
          this.router.navigateByUrl('/mozo');
          this.miFormulario.reset();
        } else if (this.user.email == 'cocinero@yopmail.com') {
          this.cargando = false;
          this.router.navigateByUrl('/cocinero');
          this.miFormulario.reset();
        } else if (this.user.email == 'bartender@yopmail.com') {
          this.cargando = false;
          this.router.navigateByUrl('/bartender');
          this.miFormulario.reset();
        } else {
          this.cargando = false;
          this.router.navigateByUrl('/home-clientes');
          this.miFormulario.reset();
        }
      }
    }
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
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon: icon,
      title: text,
    });
  }
}
