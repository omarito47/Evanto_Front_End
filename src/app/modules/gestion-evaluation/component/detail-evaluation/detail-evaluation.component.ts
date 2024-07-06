import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EvaluationService } from 'src/app/core/services/evaluation.service';
import { Evaluation } from 'src/app/core/model/evaluation';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-detail-evaluation',
  templateUrl: './detail-evaluation.component.html',
  // styleUrls: ['./detail-evaluation.component.css']
})
export class DetailEvaluationComponent implements OnInit {
  emojis: string[] = ['😀', '😍', '👍', '🎉', '❤️', '😊', '👏', '🔥', '😎', '😂'];

  evaluations: Evaluation[] = [];
  atelierId: string = '';
  errorMessage: string | null = null;
  confirmationMessage: string | null = null;
  cancellationMessage: string | null = null;
  selectedEmoji: string | null = null; // Déclaration de selectedEmoji
  
  constructor(
    private route: ActivatedRoute,
    private evaluationService: EvaluationService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.atelierId = params['id'];
      this.getEvaluationsByAtelierId();
    });
  }

  getEvaluationsByAtelierId() {
    this.evaluationService.getEvaluationsByAtelierId(this.atelierId)
      .subscribe(
        (data: any) => {
          this.evaluations = data.evaluations;
        },
        (error: HttpErrorResponse) => {
          console.error('Erreur lors du chargement des évaluations :', error);
          this.errorMessage = 'Erreur lors du chargement des évaluations';
        }
      );
  }

  addComment(userId: string, comment: string) {
    this.evaluationService.addCommentByAtelierId(this.atelierId, userId, comment)
      .subscribe(
        (data: any) => {
          console.log('Commentaire ajouté avec succès :', data);
          this.getEvaluationsByAtelierId(); // Rafraîchir les évaluations après l'ajout du commentaire
        },
        (error: HttpErrorResponse) => {
          console.error('Erreur lors de l\'ajout du commentaire :', error);
          // Gestion de l'erreur ici
        }
      );
  }

  confirmEvaluation() {
    this.evaluationService.confirmEvaluationByAtelierId(this.atelierId)
      .subscribe(
        (data: any) => {
          console.log('Evaluation confirmée avec succès :', data);
          this.confirmationMessage = 'L\'évaluation a été confirmée avec succès.';
          this.cancellationMessage = null; // Réinitialiser le message d'annulation
          this.getEvaluationsByAtelierId(); // Recharger les évaluations après confirmation
        },
        (error: HttpErrorResponse) => {
          console.error('Erreur lors de la confirmation de l\'évaluation :', error);
          // Gestion de l'erreur ici
        }
      );
  }

  cancelEvaluation() {
    this.evaluationService.cancelEvaluationByAtelierId(this.atelierId)
      .subscribe(
        (data: any) => {
          console.log('Evaluation annulée avec succès :', data);
          this.cancellationMessage = 'L\'évaluation a été annulée avec succès.';
          this.confirmationMessage = null; // Réinitialiser le message de confirmation
          this.getEvaluationsByAtelierId(); // Recharger les évaluations après annulation
        },
        (error: HttpErrorResponse) => {
          console.error('Erreur lors de l\'annulation de l\'évaluation :', error);
          // Gestion de l'erreur ici
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
}
