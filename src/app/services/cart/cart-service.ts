import { computed, Injectable, signal } from '@angular/core';
import { Products, Review } from '../products';
import { cartItem } from './cart-interface';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItems = signal<cartItem[]>([]);

  totalItems = computed(() => this.cartItems().reduce((total, item) => total + item.quantity, 0));

  addTOCart(product: any) {
    this.cartItems.update((items) => {
      const existingItem = items.find((item) => item.product.id === product.id);
      if (existingItem) {
        return items.map((item) =>
          item.product.id === product.id  ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...items, { product, quantity: 1 }];
    });
  }

  reduceFromCart(product: Products | undefined) {
    this.cartItems.update((items) => {
      return items
        .map((item) =>
          item.product.id === product?.id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0);
    });
  }

  deleteFromCart(product: Products | undefined) {
    this.cartItems.update((items) => items.filter((item) => item.product.id !== product?.id));
  }

  getQuantity(product: Products): number {
    return this.cartItems().find((item) => item.product.id === product.id)?.quantity ?? 0;
  }


}

