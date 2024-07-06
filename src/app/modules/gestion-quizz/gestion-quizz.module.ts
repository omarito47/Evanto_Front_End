import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GestionQuizzRoutingModule } from './gestion-quizz-routing.module';

import { AddQuizComponent } from './component/add-quiz/add-quiz.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { QuizListComponent } from './component/quiz-list/quiz-list.component';

@NgModule({
  declarations: [
    
    AddQuizComponent,
         QuizListComponent
  ],
  imports: [
    CommonModule,
    GestionQuizzRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ]
})
export class GestionQuizzModule { }
