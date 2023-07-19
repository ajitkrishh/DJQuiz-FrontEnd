import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from '../quiz.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
})
export class ResultComponent {

  result: any[] = []
  constructor(
    private quizservice: QuizService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    firstValueFrom(this.quizservice.getResult())
      .then(data => {
        this.result = data.data;
        console.log(this.result);
      });
  }


}
