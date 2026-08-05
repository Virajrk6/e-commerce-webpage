import { Component, computed, inject, input, output, signal } from '@angular/core';
import { MatDrawer, MatDrawerContainer } from '@angular/material/sidenav';
import { Header } from "../header/header";
import { MatBadge } from '@angular/material/badge';
import { CartService } from '../../services/cart/cart-service';
import { MatIcon } from '@angular/material/icon';
import { MatAnchor, MatButton } from "@angular/material/button";
import { MatCard, MatCardHeader, MatCardTitle, MatCardSubtitle, MatCardActions, MatCardContent } from "@angular/material/card";
import { Products } from '../../services/products';
import { compatForm } from '@angular/forms/signals/compat';
import { Api } from '../../services/api';
import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { Router, RouterLink } from "@angular/router";
import { MatPrefix } from "../../../../node_modules/@angular/material/types/_form-field-chunk";
import { routes } from '../../app.routes';

@Component({
  selector: 'app-cart',
  imports: [Header, MatCard, MatCardSubtitle, MatCardActions, MatAnchor, MatButton, MatIcon, MatCardContent,
    CurrencyPipe, MatCardHeader, RouterLink],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart {
  cart = inject(CartService)
  router = inject(Router)

  discount = computed(()=>{
    const product = this.cart.cartItems()
    return product.reduce((sum,item)=>
      sum + ((item.product.discountPercentage* item.product.price)/100 * item.quantity), 0)
  })

  subTotal = computed(()=>{
    const product = this.cart.cartItems()
    return product.reduce((sum, item)=>
      sum + ((item.product.price - (item.product.discountPercentage* item.product.price)/100) * item.quantity), 0)
  })

  goToDetails(id:number){ 
    this.router.navigateByUrl(`details/${id}`)
  }
}