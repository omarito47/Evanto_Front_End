import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from 'src/app/core/services/quiz.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  // styleUrls: ['./add-quiz.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.5s', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('0.5s', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class AddQuizComponent implements OnInit {
  atelierId!: string;
  quiz = {
    question: '',
    options: '',
    correctAnswer: ''
  };
  responseMessage: string | null = null;
  isCorrect: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private quizService: QuizService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.atelierId = this.route.snapshot.paramMap.get('atelierId')!;
  }

  onSubmit(): void {
    if (!this.quiz.question || !this.quiz.options || !this.quiz.correctAnswer) {
      this.responseMessage = 'Veuillez remplir tous les champs.';
      return;
    }

    const quizData = {
      question: this.quiz.question,
      options: this.quiz.options.split(',').map(option => option.trim()),
      correctAnswer: this.quiz.correctAnswer
    };

    this.quizService.addQuizForAtelier(this.atelierId, quizData).subscribe(
      response => {
        console.log('Quiz ajouté avec succès', response);
        this.isCorrect = true;
        this.responseMessage = 'Quiz ajouté avec succès!';
        setTimeout(() => {
          this.responseMessage = null;
          // this.router.navigate(['/atelier', this.atelierId, 'quizzes']);
        }, 3000);
      },
      error => {
        console.error('Erreur lors de l\'ajout du quiz', error);
        this.isCorrect = false;
        this.responseMessage = 'Erreur lors de l\'ajout du quiz. Veuillez réessayer.';
        setTimeout(() => {
          this.responseMessage = null;
        }, 3000);
      }
    );
  }
}
