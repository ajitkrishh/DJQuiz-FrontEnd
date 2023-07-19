import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuizService } from '../quiz.service';
import { first } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  loginError:string = '';

  
  form!: FormGroup;
  constructor(private fb: FormBuilder,
    private quizservice: QuizService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }
  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit() {
    // console.log(this.form.errors);
    // console.log(this.form.valid);
    // console.log(this.form.value);
    this.quizservice.login(this.form.value).pipe(first())
      .subscribe({
        next: () => {
          // get return url from query parameters or default to home page
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/selecttopic';
          this.router.navigateByUrl(returnUrl);
        },
        error: error => {
          console.log('error',error);
          if (error.status == 401){
            this.loginError = error.error.detail;
          }
        }
      });
  }

}
