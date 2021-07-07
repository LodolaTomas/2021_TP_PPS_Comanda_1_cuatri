import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationsService } from 'src/app/services/notifications.service';
import { CloudFirestoreService } from 'src/app/services/cloud-firestore.service';

@Component({
  selector: 'app-adm-platos',
  templateUrl: './adm-platos.page.html',
  styleUrls: ['./adm-platos.page.scss'],
})
export class AdmPlatosPage implements OnInit {

  constructor(private authS: AuthService,
    private notifSVC: NotificationsService,
    private router: Router,
    private firestore: CloudFirestoreService) {}

  ngOnInit() {
  }


  back() {
    this.router.navigateByUrl("cocinero")

  }

}
