import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CloudFirestoreService } from 'src/app/services/cloud-firestore.service';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.page.html',
  styleUrls: ['./resultados.page.scss'],
})
export class ResultadosPage implements OnInit {

public resultados:any = [];

  constructor(   private router: Router, private firestore: CloudFirestoreService) {

    firestore.GetAll("encuestas")
    .subscribe((data) => {
      this.resultados = data;
      console.log(this.resultados)
    });
   }

  ngOnInit() {
  }

  back() {
    this.router.navigateByUrl('home-clientes')
  }

}

