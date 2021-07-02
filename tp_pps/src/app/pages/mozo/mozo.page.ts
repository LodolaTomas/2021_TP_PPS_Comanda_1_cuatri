import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-mozo',
  templateUrl: './mozo.page.html',
  styleUrls: ['./mozo.page.scss'],
})
export class MozoPage implements OnInit {

  constructor(private authS:AuthService, private router:Router) { }

  ngOnInit() {
  }

  logout()
  {
    localStorage.removeItem('token')
    this.authS.LogOutCurrentUser()
    this.router.navigateByUrl('login')
  }

  


  BTNconsultas()
  {
    this.router.navigateByUrl('adm-consultas')
  }

}
