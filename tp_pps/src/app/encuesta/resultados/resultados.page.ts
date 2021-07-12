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
  public satifaccion: any = [];
  public comentarios: any = [];



  constructor(private router: Router, private firestore: CloudFirestoreService) {

    firestore.GetAll("encuestas")
      .subscribe((data) => {
        this.filtrarResultados(data);
        console.log(this.satifaccion);
        console.log(this.volveria);
        console.log(this.probaste);
        console.log(this.recomienda);
      });
  }

  ngOnInit() {
    var myChart = new Chart("myChart", {
        type: 'bar',
        data: {
            labels: ['SI', 'NO'],
            datasets: [{
                label: '# of Votes',
                data: [2,3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
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
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    
  }

  filtrarResultados(data) {
    data.forEach(element => {
      this.satifaccion.push(element.satifaccion)
    });

    data.forEach(element => {
      this.volveria.push(element.volveria)
    });

    data.forEach(element => {
      this.probaste.push(element.probaste)
    });

    data.forEach(element => {
      this.recomienda.push(element.recomienda)
    });


  }


  back() {
    this.router.navigateByUrl('home-clientes')
  }

}

