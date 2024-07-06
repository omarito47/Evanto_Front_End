import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddQuizComponent } from './component/add-quiz/add-quiz.component';
import { QuizListComponent } from './component/quiz-list/quiz-list.component';
const routes: Routes = [
  
  // { path: 'add-quiz/:atelierId', component: AddQuizComponent },
  { path: 'atelier/:atelierId/add-quiz', component: AddQuizComponent },
  { path: 'atelier/:atelierId/quizzes', component: QuizListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionQuizzRoutingModule { }
