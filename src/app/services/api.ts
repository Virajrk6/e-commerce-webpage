import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductResponse } from './products';

@Injectable({
  providedIn: 'root',
})
export class Api {

  productApi = 'https://dummyjson.com/products'

  constructor(private http: HttpClient) {
  }

  getProduct() {
    return this.http.get<ProductResponse>(this.productApi);
  }
}
