// import { Component } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { Salle } from 'src/app/core/models/salle';
// import { TypeSalle } from 'src/app/core/models/typeSalle';
// import { ConsumerGSService } from 'src/app/core/services/consumer-gs.service';


// @Component({
//   selector: 'app-details-salle-client',
//   templateUrl: './details-salle-client.component.html',
//   styleUrls: ['./details-salle-client.component.css']
// })
// export class DetailsSalleClientComponent {
//   salle!: Salle;
//   ListTypeSalles: TypeSalle[] = [];

//   constructor(
//     private SCGS: ConsumerGSService,
//     private ar: ActivatedRoute
//   ) {}

//   ngOnInit() {
//     const salleId = this.ar.snapshot.params['id'];
    
//     // Fetch the salle details
//     this.SCGS.getSalleById(salleId).subscribe({
//       next: (response) => {
//         console.log('Fetched salle:', response); // Log fetched salle
//         this.salle = response;
//       },
//       error: (error) => {
//         console.error('Error fetching salle:', error);
//       },
//     });

//     // Fetch the typeSalles list
//     this.SCGS.getTypeSalles().subscribe({
//       next: (response) => {
//         console.log('Fetched typeSalles:', response); // Log fetched typeSalles
//         this.ListTypeSalles = response;
//       },
//       error: (error) => {
//         console.error('Error fetching typeSalles:', error);
//       }
//     });
//   }

//   getTypeSalleLibelle(typeSalleId: string): string {
//     console.log('ListTypeSalles:', this.ListTypeSalles); // Log the list of typeSalles
//     const typeSalle = this.ListTypeSalles.find(type => type._id === typeSalleId);
//     const libelle = typeSalle ? typeSalle.libelle : 'N/A';
//     console.log(`Mapping typeSalleId ${typeSalleId} to libelle ${libelle}`); // Log mapping
//     return libelle;
//   }
// }

import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Salle } from 'src/app/core/models/salle';
import { TypeSalle } from 'src/app/core/models/typeSalle';
import { ConsumerGSService } from 'src/app/core/services/consumer-gs.service';
import { RatingSalleClientComponent } from 'src/app/rating-salle-client/rating-salle-client.component';


@Component({
  selector: 'app-details-salle-client',
  templateUrl: './details-salle-client.component.html',
  styleUrls: ['./details-salle-client.component.css']
})
export class DetailsSalleClientComponent {
  salle!: Salle;
  ListTypeSalles: TypeSalle[] = [];

  constructor(
    private SCGS: ConsumerGSService,
    private ar: ActivatedRoute
  ) {}

  ngOnInit() {
    const salleId = this.ar.snapshot.params['id'];
    
    // Fetch the salle details
    this.SCGS.getSalleById(salleId).subscribe({
      next: (response) => {
        console.log('Fetched salle:', response); // Log fetched salle
        this.salle = response;
      },
      error: (error) => {
        console.error('Error fetching salle:', error);
      },
    });

    // Fetch the typeSalles list
    this.SCGS.getTypeSalles().subscribe({
      next: (response) => {
        console.log('Fetched typeSalles:', response); // Log fetched typeSalles
        this.ListTypeSalles = response;
      },
      error: (error) => {
        console.error('Error fetching typeSalles:', error);
      }
    });
  }

  getTypeSalleLibelle(typeSalleId: string): string {
    console.log('ListTypeSalles:', this.ListTypeSalles); // Log the list of typeSalles
    const typeSalle = this.ListTypeSalles.find(type => type._id === typeSalleId);
    const libelle = typeSalle ? typeSalle.libelle : 'N/A';
    console.log(`Mapping typeSalleId ${typeSalleId} to libelle ${libelle}`); // Log mapping
    return libelle;
  }
}
