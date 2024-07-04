import { Component, OnInit } from '@angular/core';
import { Chart, ChartConfiguration } from 'chart.js';
import { ReclamationService } from 'src/app/core/services/reclamation.service';

@Component({
  selector: 'app-reclamation-monthly-stats',
  templateUrl: './reclamation-monthly-stats.component.html',
  styleUrls: ['./reclamation-monthly-stats.component.scss']
})
export class ReclamationMonthlyStatsComponent implements OnInit {

  // constructor(private reclamationService: ReclamationService) { }

  // ngOnInit(): void {
  //   this.reclamationService.getMonthlyReclamations().subscribe((data: any) => {
  //     const labels = data.map((item: any) => item.month);
  //     const values = data.map((item: any) => item.percentage);
      
  //     this.renderChart(labels, values);
  //   });
  // }

  // renderChart(labels: string[], data: number[]): void {
  //   const ctx = document.getElementById('reclamationChart') as HTMLCanvasElement;

  //   new Chart(ctx, {
  //     type: 'bar',
  //     data: {
  //       labels: labels,
  //       datasets: [{
  //         label: 'Reclamations Percentage',
  //         data: data,
  //         backgroundColor: 'rgba(54, 162, 235, 0.2)',
  //         borderColor: 'rgba(54, 162, 235, 1)',
  //         borderWidth: 1
  //       }]
  //     },
  //     options: {
  //       scales: {
  //         y: {
  //           beginAtZero: true,
  //           ticks: {
  //             callback: function(value) {
  //               return value + "%";
  //             }
  //           }
  //         }
  //       },
  //       plugins: {
  //         tooltip: {
  //           callbacks: {
  //             label: function(tooltipItem) {
  //               return tooltipItem.raw + "%";
  //             }
  //           }
  //         }
  //       }
  //     }
  //   });
  // }




  constructor(private reclamationService: ReclamationService) { }

  ngOnInit(): void {
    this.reclamationService.getMonthlyReclamations().subscribe((data: any) => {
      const labels = data.map((item: any) => item.month);
      const values = data.map((item: any) => item.percentage);

      this.renderChart(labels, values);
    });
  }

  renderChart(labels: string[], data: number[]): void {
    const ctx = document.getElementById('reclamationChart') as HTMLCanvasElement;

    const gradient = ctx.getContext('2d')?.createLinearGradient(0, 0, 0, 400);
    if (gradient) {
      gradient.addColorStop(0, 'rgba(54, 162, 235, 0.6)');
      gradient.addColorStop(1, 'rgba(54, 162, 235, 0.2)');
    }

    const chartConfig: ChartConfiguration = {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Pourcentage des Reclamation chaque mois',
          data: data,
          backgroundColor: gradient || 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(54, 162, 235, 0.8)',
          hoverBorderColor: 'rgba(54, 162, 235, 1)',
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            labels: {
              color: 'rgba(54, 162, 235, 1)',
              font: {
                size: 14
              }
            }
          },
          tooltip: {
            callbacks: {
              label: function(tooltipItem) {
                return tooltipItem.raw + "%";
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function(value) {
                return value + "%";
              },
              color: 'rgba(54, 162, 235, 1)',
              font: {
                size: 12
              }
            },
            grid: {
              color: 'rgba(54, 162, 235, 0.2)'
            }
          },
          x: {
            ticks: {
              color: 'rgba(54, 162, 235, 1)',
              font: {
                size: 12
              }
            },
            grid: {
              color: 'rgba(54, 162, 235, 0.2)'
            }
          }
        }
      }
    };

    new Chart(ctx, chartConfig);
  }

}
