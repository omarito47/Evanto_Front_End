import { Component, OnInit } from '@angular/core';
import { ReclamationService } from 'src/app/core/services/reclamation.service';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-reclamation-chart',
  templateUrl: './reclamation-chart.component.html',
  styleUrls: ['./reclamation-chart.component.scss']
})
export class ReclamationChartComponent implements OnInit {
 

  // reclamationsCount: any[] = [];

  // constructor(private reclamationService: ReclamationService) { }

  // ngOnInit(): void {
  //   this.reclamationService.getReclamationsCountByService().subscribe(data => {
  //     this.reclamationsCount = data;
  //     // this.createChart();
  //   });
  // }

  // createChart(): void {
  //   // Logic to create chart
  //   // Example with Chart.js
  //   const labels = this.reclamationsCount.map(item => item.serviceName);
  //   const data = this.reclamationsCount.map(item => item.count);

  //   new Chart('canvas', {
  //     type: 'bar',
  //     data: {
  //       labels: labels,
  //       datasets: [
  //         {
  //           data: data,
  //           backgroundColor: 'rgba(0, 123, 255, 0.5)'
  //         }
  //       ]
  //     },
  //     options: {
  //       responsive: true,
  //       scales: {
  //         x: {
  //           beginAtZero: true
  //         },
  //         y: {
  //           beginAtZero: true
  //         }
  //       }
  //     }
  //   });
  // }




  reclamationsCount: any[] = [];

  constructor(private reclamationService: ReclamationService) { }

  ngOnInit(): void {
    this.reclamationService.getReclamationsCountByService().subscribe(data => {
      this.reclamationsCount = data;
      this.createChart();
    });
  }

  // createChart(): void {
  //   const labels = this.reclamationsCount.map(item => item.serviceName);
  //   const data = this.reclamationsCount.map(item => item.count);
  
  //   new Chart('canvas', {
  //     type: 'bar',
  //     data: {
  //       labels: labels,
  //       datasets: [
  //         {
  //           label: 'Reclamations Count',
  //           data: data,
  //           backgroundColor: 'rgba(0, 123, 255, 0.5)'
  //         }
  //       ]
  //     },
  //     options: {
  //       responsive: true,
  //       maintainAspectRatio: false, // Allow custom aspect ratio
  //       scales: {
  //         x: {
  //           beginAtZero: true
  //         },
  //         y: {
  //           beginAtZero: true
  //         }
  //       }
  //     }
  //   });
  // }



  createChart(): void {
    const labels = this.reclamationsCount.map(item => item.serviceName);
    const data = this.reclamationsCount.map(item => item.count);

    // Generate unique colors for each bar
    const backgroundColors = this.generateColors(labels.length);

    new Chart('canvas', {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Nombre de Reclamations',
            data: data,
            backgroundColor: backgroundColors
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
          x: {
            beginAtZero: true
          },
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1, // Ensure the step size is 1
              callback: function(value) {
                if (Number.isInteger(value)) {
                  return value.toString(); // Return only whole numbers
                }
              }
            }
          }
        }
      }
    });
  }
  generateColors(count: number): string[] {
    const colors = [];
    for (let i = 0; i < count; i++) {
      const color = `hsl(${i * (360 / count)}, 70%, 50%)`;
      colors.push(color);
    }
    return colors;
  }
}
