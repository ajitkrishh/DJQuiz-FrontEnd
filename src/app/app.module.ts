import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { QuizComponent } from './quiz/quiz.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { QuestionAnswerComponent } from './question-answer/question-answer.component';
import { JwtInterceptor } from 'src/helpers/jwt.interceptor';
import { ResultComponent } from './result/result.component';
import { NavbarComponent } from './navbar/navbar.component';
import { Errorhandlerinterceptor } from 'src/helpers/error.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    QuizComponent,
    QuestionAnswerComponent,
    ResultComponent,
    NavbarComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule 
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor , multi:true},
    {provide: HTTP_INTERCEPTORS, useClass: Errorhandlerinterceptor , multi:true},  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
