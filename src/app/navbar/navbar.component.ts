import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from '../quiz.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  constructor(
    private quizservice: QuizService,
    private router: Router
    ){}
  doLogout() {
    console.log("clicked");
    
    this.quizservice.logout()
  }
}
