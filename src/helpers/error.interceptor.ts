import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';
import { QuizService } from 'src/app/quiz.service';

@Injectable({
  providedIn: 'root'
})
export class Errorhandlerinterceptor {

  constructor( private quizservice: QuizService) { }

  intercept(req:HttpRequest<any> , next:HttpHandler):Observable<HttpEvent<any>>{
    return next.handle(req).pipe(
      catchError(err =>{
        // console.log(err);
        if(err.status == 401 || err.status == 403){
          this.quizservice.logout();
        }
        return throwError(err.message);
        
      })
    )
  }
}
