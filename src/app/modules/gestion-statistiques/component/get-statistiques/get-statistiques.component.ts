import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ParticipationService } from 'src/app/core/services/participation.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-get-statistiques',
  templateUrl: './get-statistiques.component.html',
  //styleUrls: ['./get-statistiques.component.css']
})
export class GetStatistiquesComponent implements OnInit {

  atelierId: string | null = null;
  workshopStats: any;
  pieChartImage: string | undefined;

  constructor(
    private route: ActivatedRoute,
    private participationService: ParticipationService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.atelierId = params.get('atelierId');
      if (this.atelierId) {
        this.fetchWorkshopStats();
      }
    });
  }

  fetchWorkshopStats(): void {
    if (!this.atelierId) {
      console.error('Atelier ID est undefined');
      return;
    }

    this.participationService.getWorkshopStats(this.atelierId).subscribe(
      stats => {
        this.workshopStats = stats;
      },
      error => {
        console.error('Erreur lors de la récupération des statistiques de l\'atelier :', error);
      }
    );
  }

  generatePieChart(): void {
    if (!this.atelierId) {
      console.error('Atelier ID est undefined');
      return;
    }

    const url = `http://127.0.0.1:9090/participation/stats/chart/${this.atelierId}`;
    console.log('URL de la requête:', url);

    this.participationService.generateWorkshopStatsPieChart(this.atelierId).subscribe(
      (blob: Blob) => {
        saveAs(blob, 'workshop_stats.png');
        this.pieChartImage = URL.createObjectURL(blob);
      },
      error => {
        console.error('Erreur lors de la génération du graphique des statistiques de l\'atelier :', error);
      }
    );
  }

}
