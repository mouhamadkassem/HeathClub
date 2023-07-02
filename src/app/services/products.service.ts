import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from 'src/interface';

const httpOptions = {
  headers: new HttpHeaders({
    'content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  apiUrl: string = 'https://health-club-ihgy.onrender.com/shop';

  constructor(private http: HttpClient) {}

  getProducts(type: string): Observable<Product[]> {
    return this.http.post<Product[]>(this.apiUrl, { type }, httpOptions);
  }

  getProduct(id: number) {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }
}
