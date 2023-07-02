import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  apiUrl = 'https://health-club-ihgy.onrender.com';
  constructor(private http: HttpClient) {}

  sendMessage(message: any) {
    return this.http.post(`${this.apiUrl}/message`, message, httpOptions);
  }
}
