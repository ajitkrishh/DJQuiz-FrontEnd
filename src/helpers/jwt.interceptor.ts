import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';


 import { QuizService,rootUrl } from 'src/app/quiz.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private quizservice: QuizService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if account is logged in and request is to the api url
        let user:any = localStorage.getItem('user');
        let token:string = '';
        if(user !== null ){
            try {
                token = JSON.parse(user)['access'];
                // console.log(user['access']);         
            } catch (error) {  
                this.quizservice.logout(); 
            }
        }
        // console.log('url is' , request.url);
        
        const isApiUrl = request.url.startsWith(rootUrl);
        if (token && isApiUrl) {
            request = request.clone({
                setHeaders: { Authorization: `Bearer ${token}` }
            });
        }
        // console.log(request.headers);
        
        return next.handle(request);
    }
}