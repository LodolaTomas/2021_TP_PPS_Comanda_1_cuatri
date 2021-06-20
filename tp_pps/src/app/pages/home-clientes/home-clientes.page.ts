import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home-clientes',
  templateUrl: './home-clientes.page.html',
  styleUrls: ['./home-clientes.page.scss'],
})
export class HomeClientesPage implements OnInit {

  navigate : any;

  constructor(private authS:AuthService, private router:Router) {
    this.sideMenu();
  }
  ngOnInit() {
  }
  sideMenu()
  {
    this.navigate =
    [
      {
        title : "Escaneo de Entrada",
        // url   : "/alta-producto",
        icon  : "qr-code"
      }
      // ,
      
        // {
        //   title : "Alta de mesa",
        //   url   : "/alta-mesa",
        //   icon  : "pencil"
        // }
    ]
  }
  logout()
  {
    this.authS.LogOutCurrentUser()
    this.router.navigateByUrl('login')
  }
}
