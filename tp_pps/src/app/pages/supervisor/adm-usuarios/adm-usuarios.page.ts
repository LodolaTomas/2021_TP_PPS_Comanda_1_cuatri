import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-adm-usuarios',
  templateUrl: './adm-usuarios.page.html',
  styleUrls: ['./adm-usuarios.page.scss'],
})
export class AdmUsuariosPage implements OnInit {

  constructor(private authS:AuthService, private router:Router) { }

  ngOnInit() {
  }

  
  back()
  {
    this.authS.LogOutCurrentUser()
    this.router.navigateByUrl('supervisor')
  }

  

}
