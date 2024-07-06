import { Component, OnInit } from '@angular/core';
import { ParticipationService } from 'src/app/core/services/participation.service';
import { UsersService } from 'src/app/core/services/users.service';
import { AtelierService } from 'src/app/core/services/atelier.service';
import { Participation } from 'src/app/core/model/participation';
import { User } from 'src/app/core/model/user';
import { Atelier } from 'src/app/core/model/atelier';
import { Observable, throwError, of } from 'rxjs';
import { tap, catchError, finalize, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-admin-participation',
  templateUrl: './admin-participation.component.html',
  // styleUrls: ['./admin-participation.component.css']
})
export class AdminParticipationComponent implements OnInit {

  participations: Participation[] = [];
  users: User[] = [];
  ateliers: Atelier[] = [];
  loadingAteliers = false;
  successMessage: string | null = null; // Message de succès
  errorMessage: string | null = null; // Message d'erreur
  userMap: { [userId: string]: string } = {}; // Déclaration de userMap comme un objet de mapping
  
  constructor(
    private participationService: ParticipationService,
    private userService: UsersService,
    private atelierService: AtelierService
  ) {}

  ngOnInit(): void {
    this.loadParticipations();
    this.loadUsers();
    this.loadAteliers().subscribe(); // Subscribe here to start loading ateliers immediately
  }

  loadParticipations(): void {
    this.participationService.getParticipations().subscribe(
      (data: Participation[]) => this.participations = data,
      error => {
        console.error('Error fetching participations', error);
        this.errorMessage = 'Erreur lors du chargement des participations.';
      }
    );
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe(
      (data: User[]) => this.users = data,
      error => {
      }
    );
  }

  loadAteliers(): Observable<void> {
    this.loadingAteliers = true;

    return this.atelierService.fetchAll().pipe(
      tap((data: Atelier[]) => {
        this.ateliers = data;
      }),
      catchError(error => {
        console.error('Error fetching ateliers', error);
        this.errorMessage = 'Erreur lors du chargement des ateliers.';
        return throwError(error);
      }),
      switchMap(() => of(null)), // Switch to an observable that emits null (void)
      finalize(() => {
        this.loadingAteliers = false;
      })
    );
  }

  getUserName(userId: string): string {
    return this.userMap[userId] || 'Nawel'; // Retrieve the user name using userMap
  }

  getNomAtelier(atelierId: string): string {
    const atelier = this.ateliers.find(a => a._id === atelierId);
    return atelier ? atelier.nom : 'Peinture';
  }

  getEtatParticipation(participation: Participation): string {
    return participation.etat === 'confirmée' ? 'Confirmée' :
           participation.etat === 'annulée' ? 'Annulée' :
           'En attente';
  }

  canCancelParticipation(participation: Participation): boolean {
    // Logique pour vérifier si la participation peut être annulée
    return participation.etat === 'confirmée'; // Exemple de condition, à adapter selon vos besoins
  }

  onCancelParticipation(userId: string, participationId: string): void {
    this.participationService.cancelParticipationByUserId(userId, participationId)
      .subscribe(
        response => {
          console.log('Participation annulée avec succès :', response);
          // Afficher la notification de succès
          this.successMessage = 'La participation a été annulée avec succès.';
          // Mettez à jour l'interface utilisateur si nécessaire
          this.loadParticipations(); // Recharger les participations après annulation
          // Actualiser la liste des participations après 48 heures
          setTimeout(() => {
            this.successMessage = null;
          }, 5000); // Temps en millisecondes pour masquer la notification (5 secondes ici)
        },
        error => {
          console.error('Erreur lors de l\'annulation de la participation :', error);
          this.errorMessage = 'Erreur lors de l\'annulation de la participation.';
        }
      );
  }

  onConfirmParticipation(participationId: string): void {
    this.participationService.confirmParticipation(participationId)
      .subscribe(
        response => {
          console.log('Participation confirmée avec succès :', response);
          this.successMessage = 'La participation a été confirmée avec succès.';
          this.loadParticipations(); // Recharger les participations après confirmation
          setTimeout(() => {
            this.successMessage = null;
          }, 5000);
        },
       
      );
  }

  onDeleteParticipation(participationId: string): void {
    this.participationService.deleteParticipation(participationId)
      .subscribe(
        response => {
          console.log('Participation supprimée avec succès :', response);
          this.successMessage = 'La participation a été supprimée avec succès.';
          this.loadParticipations(); // Recharger les participations après suppression
          setTimeout(() => {
            this.successMessage = null;
          }, 5000);
        },
        error => {
          console.error('Erreur lors de la suppression de la participation :', error);
          if (error.status === 404) {
            this.errorMessage = 'La participation que vous essayez de supprimer n\'existe pas.';
          } else {
            this.errorMessage = 'Erreur lors de la suppression de la participation.';
          }
        }
      );
  }

  closeSuccessMessage(): void {
    this.successMessage = null;
  }

  closeErrorMessage(): void {
    this.errorMessage = null;
  }

  confirmCancelParticipation(participation: Participation): void {
    if (confirm("Êtes-vous sûr de vouloir annuler cette participation?")) {
      this.onCancelParticipation(participation.client_id._id, participation._id);
    }
  }
}
