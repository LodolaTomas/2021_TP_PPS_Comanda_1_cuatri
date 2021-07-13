import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CloudFirestoreService } from 'src/app/services/cloud-firestore.service';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.page.html',
  styleUrls: ['./resultados.page.scss'],
})
export class ResultadosPage implements OnInit {

  public resultados: any = [];

  public recomienda: any = [];
  public volveria: any = [];
  public probaste: any = [];
  satisfaccion_horrible = 0;
  satisfaccion_mala = 0;
  satisfaccion_regular = 0;
  satisfaccion_buena = 0
  satisfaccion_exelente = 0;
  public comentarios: any = [];

  constructor(private router: Router, private firestore: CloudFirestoreService) {
  }

  ngOnInit() {
    this.firestore.GetAll("encuestas")
      .subscribe(async (data) => {
        this.filtrarSatisfaccion(data);
        this.filtrarRecomienda(data)
        this.filtrarProbo(data)
      });
  }

  filtrarProbo(data:Array<any>){
    let comida=0;
    let bebida=0;
    let postre=0;
    data.forEach(element=>{
      if(element.comidas){
        comida+=1;
      }
      if(element.postres){
        postre+=1;
      }
      if(element.bebidas){
        bebida+=1;
      }
    })
    const myChart = new Chart("myChart3", {
      type: 'line',
      data: {
        labels: ['Comida', 'Postre', 'Bebida'],
        datasets: [{
          label: 'Que Probo',
          data: [comida,postre,bebida],
          borderColor:  'rgb(232, 17, 35)',
          tension: .5
        }]
      },
      options:{
        responsive:true,
        maintainAspectRatio:true,
      },
    });


  }



  filtrarSatisfaccion(data) {
    data.forEach(element => {
      if (element.satifaccion == 0) {
        this.satisfaccion_horrible += 1;
      } else if (element.satifaccion == 1) {
        this.satisfaccion_mala += 1;
      } else if (element.satifaccion == 2) {
        this.satisfaccion_regular += 1;
      } else if (element.satifaccion == 3) {
        this.satisfaccion_buena += 1;
      } else if (element.satifaccion == 4) {
        this.satisfaccion_exelente += 1;
      }
    });
    const myChart = new Chart("myChart", {
      type: 'bar',
      data: {
        labels: ['Horrible', 'Mala', 'Regular', 'Buena', 'Exelente'],
        datasets: [{
          label: 'Satisfaccion',
          data: [this.satisfaccion_horrible, this.satisfaccion_mala, this.satisfaccion_regular, this.satisfaccion_buena, this.satisfaccion_exelente],
          backgroundColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options:{
        responsive:true,
        maintainAspectRatio:true,
        
      }
    });
  }

  filtrarRecomienda(data:Array<any>){
    let recomienda_si=0
    let recomienda_no=0
    data.forEach(element=>{
      if(element.recomienda=='si'){
        recomienda_si+=1;
      }
      if(element.recomienda=='no'){
        recomienda_no+=1;
      }
    })
    const myChart = new Chart("myChart2", {
      type: 'pie',
      data: {
        labels: ['SI', 'NO'],
        
        datasets: [{
          label: '# of Votes',
          data: [recomienda_si,recomienda_no],
          backgroundColor: [
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)',
          ],
          hoverOffset: 4,
          
        }]
      },
      options:{
        responsive:true,
        maintainAspectRatio:true,
        
      }
    });


  }

  back() {
    this.router.navigateByUrl('home-clientes')
  }

}

