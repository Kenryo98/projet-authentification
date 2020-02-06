import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms'; 
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { sha512 } from 'js-sha512' ;

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  back_url:string= "http://localhost:3000";

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<boolean> {

    password = sha512(password);

    return this.http.post<{token: string}>(this.back_url+'/api/auth', {username, password})
      .pipe(
        map(result => {
          localStorage.setItem('access_token', result.token);
          return true;
        })
      );
  }

  logout() {
    localStorage.removeItem('access_token');
  }
  

  register(username: string, password: string, confirmation:string) {

    password = sha512(password);
    confirmation = sha512(confirmation);

    return this.http.post(this.back_url+'/api/register', {username, password,confirmation}).toPromise();
  }

  public get loggedIn(): boolean {
    return (localStorage.getItem('access_token') !== null);
  }

}
