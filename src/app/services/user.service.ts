import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/interface';

const httpOptions = {
  headers: new HttpHeaders({
    'content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  apiUrl: string = 'https://health-club-ihgy.onrender.com';

  onRegister(newUser: User) {
    return this.http.post<User>(
      `${this.apiUrl}/users/register`,
      newUser,
      httpOptions
    );
  }

  onLogin(user: User) {
    return this.http.post<User>(
      `${this.apiUrl}/users/login`,
      user,
      httpOptions
    );
  }

  addCart(newCart: any) {
    return this.http.post(`${this.apiUrl}/cart/addCart`, newCart, httpOptions);
  }

  doneTask(data: any) {
    return this.http.put(
      `${this.apiUrl}/users/doneTask`,
      {
        userId: data.userId,
        class: data.class,
      },
      httpOptions
    );
  }
}
