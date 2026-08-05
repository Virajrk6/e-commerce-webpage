import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit, signal } from '@angular/core';
import { ProductResponse, Products, Review } from './products';

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
