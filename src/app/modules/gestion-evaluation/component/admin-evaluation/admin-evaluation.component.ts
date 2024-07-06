import { Component, OnInit } from '@angular/core';
import { EvaluationService } from 'src/app/core/services/evaluation.service';
import { Evaluation } from 'src/app/core/model/evaluation';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-admin-evaluation',
  templateUrl: './admin-evaluation.component.html',
  //styleUrls: ['./admin-evaluation.component.css']
})
export class AdminEvaluationComponent implements OnInit {
  evaluations: Evaluation[] = [];
  replyForm: FormGroup;
  confirmationMessage: string = ''; // Add this line

  constructor(
    private evaluationService: EvaluationService,
    private fb: FormBuilder
  ) {
    this.replyForm = this.fb.group({
      // Initialize form controls as needed
    });
  }

  ngOnInit(): void {
    this.loadEvaluations();
  }

  loadEvaluations() {
    this.evaluationService.listAllEvaluations()
      .subscribe(
        (data: any) => {
          this.evaluations = data.evaluations;
        },
        error => {
          console.error('Erreur lors du chargement des évaluations :', error);
        }
      );
  }

  addEmojiToEvaluation(evaluation: Evaluation, emoji: string): void {
    this.evaluationService.addEmojiToEvaluation(evaluation._id!, emoji)
      .subscribe(
        (response: any) => {
          console.log('Emoji ajouté à l\'évaluation avec succès', response);
          evaluation.emoji = emoji;
        },
        error => {
          console.error('Erreur lors de l\'ajout de l\'emoji à l\'évaluation', error);
        }
      );
  }

  confirmEvaluation(evaluationId: string) {
    this.evaluationService.confirmEvaluation(evaluationId).subscribe(
      () => {
        const evaluation = this.evaluations.find(e => e._id === evaluationId);
        if (evaluation) {
          evaluation.confirmed = true; // Met à jour le statut confirmé
          evaluation.cancelled = false; // Assure que le statut annulé est faux
        }
      },
      (error) => {
        console.error('Erreur lors de la confirmation de l\'évaluation :', error);
      }
    );
  }

  cancelEvaluation(evaluationId: string) {
    this.evaluationService.cancelEvaluation(evaluationId).subscribe(
      () => {
        const evaluation = this.evaluations.find(e => e._id === evaluationId);
        if (evaluation) {
          evaluation.cancelled = true; // Met à jour le statut annulé
          evaluation.confirmed = false; // Assure que le statut confirmé est faux
        }
      },
      (error) => {
        console.error('Erreur lors de l\'annulation de l\'évaluation :', error);
      }
    );
  }

  deleteEvaluation(evaluationId: string): void {
    this.evaluationService.deleteEvaluation(evaluationId)
      .subscribe(
        () => {
          console.log('Évaluation supprimée avec succès');
          this.evaluations = this.evaluations.filter(evaluation => evaluation._id !== evaluationId);
          this.confirmationMessage = 'Évaluation supprimée avec succès'; // Set confirmation message
        },
        error => {
          console.error('Erreur lors de la suppression de l\'évaluation', error);
        }
      );
  }

  addAutoResponse(evaluationId: string, commentId: string): void {
    this.evaluationService.addAutoResponse(evaluationId, commentId)
      .subscribe(
        () => {
          console.log('Réponse automatique ajoutée avec succès');
          // Rafraîchir les évaluations ou les commentaires si nécessaire
        },
        error => {
          console.error('Erreur lors de l\'ajout de la réponse automatique :', error);
        }
      );
  }

  refreshEvaluations() {
    this.loadEvaluations();
  }
}
