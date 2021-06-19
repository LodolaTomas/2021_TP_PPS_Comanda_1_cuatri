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
    this.authS.LogOutCurrentUser()
    this.router.navigateByUrl('login')
  }

  BTNAltaMesa()
  {
    console.log("apreto")
    this.router.navigateByUrl('alta-mesa')
  }

  BTNAdmUsuarios()
  {
    console.log("apreto")
    this.router.navigateByUrl('adm-usuarios')
  }

}
