import { Component, computed, inject, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CurrencyPipe } from '@angular/common';
import { Products } from '../../services/products';
import { RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { CartService } from '../../services/cart/cart-service';
import { FormsModule } from '@angular/forms';
import { Ratings } from '../../services/ratings/ratings';

@Component({
  selector: 'app-product-card',
  imports: [MatCardModule, MatButtonModule, CurrencyPipe, RouterLink, MatIcon, FormsModule],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {
  // @Input({required:true,required1:true}) product!:Product; 
  // its the same as bellow but in signal form
  productsDetails = input.required<Products>();
  addbutton = input('Add to Cart');
  cartItem = inject(CartService);
  ratings = inject(Ratings)

  itemQuantity = computed(() => this.cartItem.getQuantity(this.productsDetails()));

}