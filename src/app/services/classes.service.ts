import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Classes } from 'src/interface';

@Injectable({
  providedIn: 'root',
})
export class ClassesService {
  apiUrl: string = 'https://health-club-ihgy.onrender.com/class';

  constructor(private http: HttpClient) {}

  getClasses(): Observable<Classes> {
    return this.http.get<Classes>(this.apiUrl);
  }

  getClass(id: number) {
    return this.http.get<Classes>(`${this.apiUrl}/${id}`);
  }
}
