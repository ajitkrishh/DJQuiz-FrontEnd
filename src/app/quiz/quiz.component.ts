import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService,q } from '../quiz.service';
import { firstValueFrom } from 'rxjs';



@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
})
export class QuizComponent implements OnInit{

  topics:q[] = []

  constructor(
    private quizservice: QuizService,
    private route: ActivatedRoute,
    private router: Router,
  ){
    if(this.quizservice.isStart){
      this.quizservice.isStart = false;
        // 
    }  
  }

    ngOnInit(): void {
      let topics$ = this.quizservice.getTopic();
      firstValueFrom(topics$)
      .then(data =>{
        
        this.topics = data;        
        console.log(this.topics);})
      .catch(err =>{
        console.log(err);
        if(err.status == 401){
          this.quizservice.logout()
        }
        
      })
    }

    sendTopic(id:string){
      // console.log(id);
      if(id !== '-1'){

        let questions$ = this.quizservice.postTopic({'topic':id});
        firstValueFrom(questions$)
        .then(data=>{
          // console.log(data);
          if(data?.redirect == true){
            console.log(data?.msg);
            
            this.router.navigateByUrl('/selecttopic');
          }else{
            let url2Navigate = '/quiz';
            this.quizservice.isStart = true;  
            this.router.navigateByUrl(url2Navigate , {state : data['qs']});
          }
        }).catch(err =>{
          console.log(err);
        })
      }

    }

}
