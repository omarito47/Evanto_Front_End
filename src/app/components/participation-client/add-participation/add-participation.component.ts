import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ParticipationService } from 'src/app/services/participation.service';

@Component({
  selector: 'app-add-participation',
  templateUrl: './add-participation.component.html',
  //styleUrls: ['./add-participation.component.css']
})
export class AddParticipationComponent {

  participationForm: FormGroup;
  submissionError: string | null = null;
  submissionSuccess: boolean = false; // Assurez-vous que cette propriété est déclarée correctement

  constructor(
    private formBuilder: FormBuilder,
    private participationService: ParticipationService
  ) {
    this.participationForm = this.formBuilder.group({
      userId: ['', Validators.required],
      atelierId: ['', Validators.required],
      categorieId: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.participationForm.valid) {
      const { userId, atelierId, categorieId } = this.participationForm.value;
      this.participationService.ajouterParticipation(userId, atelierId, categorieId).subscribe(
        () => {
          this.submissionSuccess = true;
          this.submissionError = null;
          console.log('Participation ajoutée avec succès');
          this.participationForm.reset(); // Réinitialiser le formulaire après succès
        },
        error => {
          this.submissionError = 'Erreur lors de l\'ajout de la participation: ' + error.message;
          this.submissionSuccess = false;
          console.error('Erreur lors de l\'ajout de la participation:', error);
        }
      );
    }
  }
}
