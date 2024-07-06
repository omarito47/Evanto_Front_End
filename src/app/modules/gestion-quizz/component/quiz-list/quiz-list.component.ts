import { Component, Input, OnInit } from '@angular/core';
import { Quiz } from 'src/app/core/model/quiz';
import { QuizService } from 'src/app/core/services/quiz.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  //styleUrls: ['./quiz-list.component.css']
})
export class QuizListComponent implements OnInit {
  atelierId!: string;
  quizzes: any[] = [];
  selectedOption: { [key: string]: string } = {};
  submittedAnswers: { [key: string]: string } = {};

  constructor(
    private route: ActivatedRoute,
    private quizService: QuizService
  ) {}

  ngOnInit(): void {
    this.atelierId = this.route.snapshot.paramMap.get('atelierId')!;
    this.loadQuizzes();
  }

  loadQuizzes(): void {
    this.quizService.getQuizzesByAtelier(this.atelierId).subscribe(
      (data) => {
        this.quizzes = data;
      },
      (error) => {
        console.error('Error fetching quizzes', error);
      }
    );
  }

  submitAnswer(quizId: string, form: any): void {
    if (this.selectedOption[quizId]) {
      this.submittedAnswers[quizId] = this.selectedOption[quizId];
    }
  }
}