import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AtelierService } from 'src/app/core/services/atelier.service';
import { Chart } from 'chart.js/auto'; // Importation correcte de Chart.js

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  //styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  @ViewChild('myChart', { static: true }) myChart!: ElementRef<HTMLCanvasElement>;
  @ViewChild('monthlyChart', { static: true }) monthlyChart!: ElementRef<HTMLCanvasElement>;

  dashboardData: any = {};
  chart: Chart | undefined;
  monthlyChartInstance: Chart | undefined;

  constructor(private atelierService: AtelierService) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData() {
    this.atelierService.getAdminDashboard().subscribe(
      (data) => {
        console.log('Dashboard Data:', data); // Vérifiez que les données sont correctes
        this.dashboardData = data;
        this.renderCharts();
      },
      (error) => {
        console.error('Error loading dashboard data: ', error);
      }
    );
  }

  renderCharts() {
    const canvas = this.myChart.nativeElement;
    const ctx = canvas.getContext('2d');

    const monthlyCanvas = this.monthlyChart.nativeElement;
    const monthlyCtx = monthlyCanvas.getContext('2d');

    if (ctx) {
      console.log('Canvas Context:', ctx); // Vérifiez que le contexte est obtenu

      if (this.chart) {
        this.chart.destroy();
      }

      this.chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Total', 'Annulés', 'À venir', 'Confirmés'],
          datasets: [{
            label: 'Nombre d\'ateliers',
            data: [
              this.dashboardData.totalAteliers || 0,
              this.dashboardData.ateliersAnnules || 0,
              this.dashboardData.ateliersAVenir || 0,
              this.dashboardData.ateliersConfirmes || 0
            ],
            backgroundColor: [
              'rgba(75, 192, 192, 0.2)',
              'rgba(255, 99, 132, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(54, 162, 235, 0.2)'
            ],
            borderColor: [
              'rgba(75, 192, 192, 1)',
              'rgba(255, 99, 132, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(54, 162, 235, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  return context.dataset.label + ': ' + context.raw;
                }
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    } else {
      console.error('Failed to get canvas context');
    }

    if (monthlyCtx) {
      console.log('Monthly Canvas Context:', monthlyCtx); // Vérifiez que le contexte est obtenu

      if (this.monthlyChartInstance) {
        this.monthlyChartInstance.destroy();
      }

      this.monthlyChartInstance = new Chart(monthlyCtx, {
        type: 'line',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          datasets: [{
            label: 'Ateliers par Mois',
            data: this.dashboardData.ateliersParMois,
            backgroundColor: 'rgba(255, 159, 64, 0.2)', // Couleur orange
            borderColor: 'rgba(255, 159, 64, 1)', // Couleur orange
            borderWidth: 1,
            fill: true,
            tension: 0.4
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  return context.dataset.label + ': ' + context.raw;
                }
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    } else {
      console.error('Failed to get monthly canvas context');
    }
  }
}
