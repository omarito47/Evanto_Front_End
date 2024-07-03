import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EvaluationService } from 'src/app/services/evaluation.service';
import { Evaluation } from 'src/app/model/evaluation';

@Component({
  selector: 'app-add-evaluation',
  templateUrl: './add-evaluation.component.html',
  styleUrls: ['./add-evaluation.component.css']
})
export class AddEvaluationComponent {
  evaluation: Evaluation = {
    userId: 'currentUserId', // Remplacez par l'ID de l'utilisateur actuel
    atelierId: '',
    rating: 1,
    comment: '',
    atelier: {
      _id: '',
      nom: ''
    },
    likes: [],
    cancelled: false,
    confirmed: false
  };
  responseMessage: string = '';

  constructor(
    private evaluationService: EvaluationService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(params => {
      this.evaluation.atelierId = params['atelierId'];
    });
  }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      console.log('Submitting evaluation:', this.evaluation);
      this.evaluationService.createEvaluation(
        this.evaluation.atelierId,
        this.evaluation.rating,
        this.evaluation.comment
      ).subscribe(
        (response: any) => {
          this.responseMessage = 'Évaluation soumise avec succès. Points ajoutés: 10';
          form.reset();
        },
        (error: any) => {
          this.responseMessage = 'Erreur lors de la soumission de l\'évaluation';
          console.error('Error submitting evaluation', error);
        }
      );
    }
  }
}
