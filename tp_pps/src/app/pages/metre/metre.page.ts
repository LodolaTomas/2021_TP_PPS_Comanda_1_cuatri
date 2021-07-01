import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-metre',
  templateUrl: './metre.page.html',
  styleUrls: ['./metre.page.scss'],
})
export class MetrePage implements OnInit {

  constructor(private authS:AuthService, private router:Router) { }

  ngOnInit() {
  }

  logout()
  {
    localStorage.removeItem('token')
    this.authS.LogOutCurrentUser()
    this.router.navigateByUrl('login')
  }

  BTNlistaEsperaMesa()
  {
    this.router.navigateByUrl('lista-espera-mesas')
  }

  BTNconsultas()
  {
    this.router.navigateByUrl('adm-consultas')
  }

}
