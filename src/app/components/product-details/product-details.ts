import { Component, computed, ElementRef, inject, signal, ViewChild } from '@angular/core';
import { Api } from '../../services/api';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MatCard, MatCardModule } from '@angular/material/card';
import { Dimensions, Review } from '../../services/products';
import { CurrencyPipe, DatePipe, DecimalPipe, CommonModule } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatIcon } from "@angular/material/icon";
import { CartService } from '../../services/cart/cart-service';
import { Header } from '../header/header';
import { MatBadge } from "@angular/material/badge";
import { Ratings } from '../../services/ratings/ratings';



@Component({
  selector: 'app-product-details',
  imports: [MatCard, MatCardModule, CurrencyPipe, MatIcon, MatButton, Header, DatePipe, CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
})
export class ProductDetails {
  productDetails = inject(Api);
  products = signal<any>('');
  route = inject(ActivatedRoute);
  routerLink = inject(Router);
  cartItem = inject(CartService);
  reviews = signal<Review[]>([]);
  dimentions = signal<Dimensions | undefined>(undefined);
  ratings = inject(Ratings)
  i = signal(0);

  @ViewChild('imageContainer')
  imageContainer!: ElementRef<HTMLDivElement>;
  
  itemQuantity = computed<number>(() => {
    const product = this.products();
    return product ? this.cartItem.getQuantity(product) : 0;
  });

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    this.productDetails.getProduct().subscribe((data) => {
      data.products.filter((item) => {
        if (item.id.toString() == id) {
          this.products.set(item)
          this.reviews.set(item.reviews)
          this.dimentions.set(item.dimensions)
        }
      })
    })
  }

  discountedPrice = computed<number | undefined>(() => {
    const p = this.products();
    return p ? p.price - (p.discountPercentage * p.price) / 100 : undefined;
  })


  goToProduct() {
    this.routerLink.navigateByUrl('')
  }


  scrollLeft() {
    this.imageContainer.nativeElement.scrollBy({
      left: -462,
      behavior: 'smooth'
    });
    this.i.set(this.i()-1)
  }

  scrollRight() {
    this.imageContainer.nativeElement.scrollBy({
      left: 462,
      behavior: 'smooth'
    });
    this.i.set(this.i()+1)
  }
  ScrollLeftButton(){
    if(this.i()>0){
      return false;
    }
    return true;
  }
  ScrollRightButton(){
    if(this.i()<this.products().images.length -1){
      return false
    }
  return true
  }
}
