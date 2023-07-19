import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { QuizComponent } from './quiz/quiz.component';
import { QuestionAnswerComponent } from './question-answer/question-answer.component';
import { ResultComponent } from './result/result.component';
import { AuthGuard } from 'src/helpers/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/selecttopic', pathMatch: 'full' }, // Redirect to login component by default
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'selecttopic', component: QuizComponent ,canActivate:[AuthGuard]},
  { path: 'quiz', component: QuestionAnswerComponent ,canActivate:[AuthGuard]},
  { path: 'result', component: ResultComponent ,canActivate:[AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
