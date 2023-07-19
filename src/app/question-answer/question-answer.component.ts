import { Component } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { QuizService } from '../quiz.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-question-answer',
  templateUrl: './question-answer.component.html',
})
export class QuestionAnswerComponent {

  questions: any;
  length:number = 0;
  count:number = 0;
  data: any = {
    "7079ff6d-9493-4f70-9515-42d4c064fcd7": [
      "what is django?",
      [
        "370b81a6-878b-4689-941f-6044b9e611ab",
        "web framework"
      ],
      [
        "ede2d786-ae9b-47f7-94ec-a4dfee1ec546",
        "game engine"
      ],
      [
        "241442e6-0434-4cf0-85f9-5c794547b250",
        "Mobile development Framework"
      ],
      [
        "a3a4cb03-8bc2-4fa7-a9d1-333416e666ff",
        "None of these"
      ],
      [
        "84f8fe06-4c13-414a-a1cc-d4872522576d",
        "python library"
      ]
    ],
    "a03019de-ecf0-4bc5-9cba-cb3effaf0862": [
      "Django Architecture is ____",
      [
        "f1bf9e0d-aaee-4ffa-857e-cde99a2a2e82",
        "mvc"
      ],
      [
        "5563186a-9f75-4839-a11f-d1cb72781d3f",
        "mvt"
      ],
      [
        "576a278d-dd5b-4ed3-9fb2-be6d0d21db23",
        "mvvm"
      ],
      [
        "a3a4cb03-8bc2-4fa7-a9d1-333416e666ff",
        "None of these"
      ]
    ],
    "fc60042e-8772-4fb1-915f-91bf618e33b6": [
      "What can we create using Django?",
      [
        "c0016a78-8dcb-4070-8646-2b548449815a",
        "website"
      ],
      [
        "9600b916-cbe9-47ea-9104-276e5d3018a0",
        "Apps"
      ],
      [
        "dcdff7e6-cf8d-4eab-8ba5-68f0f9369687",
        "Game"
      ],
      [
        "a3a4cb03-8bc2-4fa7-a9d1-333416e666ff",
        "None of these"
      ]
    ]

  }
  key = Object.keys;
  question:any;
  options : any[] = [];
  answer:any = {};
  tempAns:string[] = []

  constructor(
    private quizservice: QuizService,
    private router: Router
  ) {
    if(!quizservice.isStart ){
      this.router.navigateByUrl('/selecttopic')
    }
    this.questions = this.router?.getCurrentNavigation()?.extras.state;
    console.log(this.questions);
    
    // this.questions = this.data;
    this.length = this.key(this.questions).length;
    this.setQuestion();  
  }
  setQuestion(){
    this.question = this.questions[this.key(this.questions)[this.count]][0];
    this.options = this.questions[this.key(this.questions)[this.count]].slice(1);

  }
  async nextquestion() {
    console.log(this.count,this.answer);
    
    let currQuestionId =  this.key(this.questions)[this.count];
    this.answer[currQuestionId] = this.tempAns;
    this.tempAns = []
    // this.count++;
    if (this.count++ >= this.length-1){
      console.log('end');
      let res = await firstValueFrom(this.quizservice.postAnswers({'payload':this.answer}));
      this.quizservice.isStart = false;
      this.router.navigateByUrl('/result');
      // window.location.href = '/result';
    }else{
      this.setQuestion();  
    }
  }
  add(e:any){
    let id:string = e.target.value;
    // console.log(e.target.checked);
    
    if(e.target.checked){
      this.tempAns.push(id);
    }
    else{
      this.tempAns = this.tempAns.filter(_id =>  _id != id )
    }
  }

}
