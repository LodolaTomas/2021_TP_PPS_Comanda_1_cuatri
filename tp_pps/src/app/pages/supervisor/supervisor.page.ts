import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-supervisor',
  templateUrl: './supervisor.page.html',
  styleUrls: ['./supervisor.page.scss'],
})
export class SupervisorPage implements OnInit {

  constructor(private authS:AuthService, private router:Router) { }

  ngOnInit() {
  }

  logout()
  {
    localStorage.removeItem('token')
    this.authS.LogOutCurrentUser()
    this.router.navigateByUrl('login')
  }

  BTNAltaMesa()
  {
    this.router.navigateByUrl('alta-mesa')
  }

  BTNAdmUsuarios()
  {
    this.router.navigateByUrl('adm-usuarios')
  }

}
