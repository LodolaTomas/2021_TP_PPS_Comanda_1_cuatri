import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  navigate : any;

  constructor(private authS:AuthService, private router:Router) {
    this.sideMenu();
  }


  sideMenu()
  {
    this.navigate =
    [
      {
        title : "Registrar Producto",
        url   : "/alta-producto",
        icon  : "pizza"
      },
      
        {
          title : "Alta de mesa",
          url   : "/alta-mesa",
          icon  : "pencil"
        },
        {
          title : "Lista de Espera",
          url   : "/lista-espera-mesas",
          icon  : "list-outline"
        }
    ]
  }

  logout()
  {
    this.authS.LogOutCurrentUser()
    this.router.navigateByUrl('login')
  }
}
