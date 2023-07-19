import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';


export interface q {
  id: string,
  name: string
}
export interface user {
  refresh: string,
  access: string,
  first_name: string,
  last_name: string,
  username: string,
}

export const rootUrl = 'http://127.0.0.1:8000/';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  private userSubject : BehaviorSubject<user | null>;
  public user?: Observable<user | null>;

  rootUrl = rootUrl;
  isStart: boolean = false;


  constructor(private router: Router,
    private http: HttpClient) {
    this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
    this.user = this.userSubject.asObservable();
  }
  public get userValue() {
    return this.userSubject.value;
  }

  login(userdata: any) {
    // console.log(this.rootUrl+'account/api/login' , userdata);

    return this.http.post<any>(this.rootUrl + 'account/api/login', userdata)
      .pipe(map(user => {
        console.log(user);
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
        return user;
      }))
  }

  logout() {
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/login'])
  }

  getTopic() {
    return this.http.get<q[]>(this.rootUrl + 'api')
  }
  postTopic(topicId: { 'topic': string }) {
    return this.http.post<any>(this.rootUrl + 'api', topicId)
  }

  getResult() {
    return this.http.get<any>(this.rootUrl + 'api/r')
  }
  postAnswers(payload: { 'payload': object }) {
    return this.http.post<any>(this.rootUrl + 'api/r', payload)
  }

}
