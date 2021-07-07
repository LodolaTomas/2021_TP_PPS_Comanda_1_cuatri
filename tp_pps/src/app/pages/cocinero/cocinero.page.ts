import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-cocinero',
  templateUrl: './cocinero.page.html',
  styleUrls: ['./cocinero.page.scss'],
})
export class CocineroPage implements OnInit {

  constructor(private authS:AuthService, private router:Router) { }

  ngOnInit() {
  }

  logout()
  {
    localStorage.removeItem('token')
    this.authS.LogOutCurrentUser()
    this.router.navigateByUrl('login')
  }

  BTNplatos()
  {
    this.router.navigateByUrl('adm-platos')
  }


}
