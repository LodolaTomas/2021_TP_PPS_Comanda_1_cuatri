import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-bartender',
  templateUrl: './bartender.page.html',
  styleUrls: ['./bartender.page.scss'],
})
export class BartenderPage implements OnInit {


  constructor(private authS:AuthService, private router:Router) { }

  ngOnInit() {
  }

  logout()
  {
    localStorage.removeItem('token')
    this.authS.LogOutCurrentUser()
    this.router.navigateByUrl('login')
  }

  BTNbebidas()
  {
    this.router.navigateByUrl('adm-bebidas')
  }


}
