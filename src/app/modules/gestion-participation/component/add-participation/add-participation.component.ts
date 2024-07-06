// add-participation.component.ts
import { Component } from '@angular/core';
import { ParticipationService } from 'src/app/core/services/participation.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-add-participation',
  templateUrl: './add-participation.component.html',
  // styleUrls: ['./add-participation.component.css']
})
export class AddParticipationComponent {
  atelierId: string | null = null;
  client_id: string = '';
  participationAdded: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private participationService: ParticipationService,
    private userService: UsersService
  ) {
    this.route.paramMap.subscribe(params => {
      this.atelierId = params.get('id');
    });
  }

  ajouterParticipation(): void {
    const userId = this.userService.getUserId();

    if (!this.atelierId || !userId) {
      console.error('Atelier ID ou Client ID est undefined');
      return;
    }
  
    this.participationService.addParticipation(userId, this.atelierId).subscribe(
      (response) => {
        console.log('Participation ajoutée avec succès :', response);
        this.participationAdded = true;
      },
      (error) => {
        console.error('Erreur lors de l\'ajout de la participation :', error);
        if (error.status === 400) {
          console.log('Erreur de requête invalide :', error.error.message);
        } else {
          // Gérer d'autres types d'erreurs ici
        }
      }
    );
  }
}
