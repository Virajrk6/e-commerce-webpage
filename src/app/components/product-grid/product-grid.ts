import { Component, computed, signal, OnInit, inject } from '@angular/core';
import { ProductCard } from '../product-card/product-card';
import { MatIcon } from '@angular/material/icon';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Api } from '../../services/api';
import { ProductResponse, Products } from '../../services/products';
import { FormsModule, NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart/cart-service';
import { RouterOutlet } from '@angular/router';
import { Header } from '../header/header';
import { MatMenu, MatMenuTrigger, MatMenuItem } from '@angular/material/menu';
import { MatAnchor } from "@angular/material/button";
import { MatOption, MatSelect } from '@angular/material/select';
import { ProductDetails } from '../product-details/product-details';

@Component({
  selector: 'app-product-grid',
  imports: [Header, ProductCard,
    MatIcon, MatFormField, MatLabel,
    MatInputModule, FormsModule,
    RouterOutlet, MatSelect, MatOption],
  templateUrl: './product-grid.html',
  styleUrl: './product-grid.css',
})
export class ProductGrid {

  // constructor(public apiService: Api, private cartService:CartService) {}

  protected apiService = inject(Api);
  protected cartService = inject(CartService);
  protected searchItem = signal('');
  protected selectedCatagory = signal<Products[] | undefined>([])
  protected products = signal<Products[] | undefined>(undefined)

  ngOnInit() {
    this.getProduct()
  }
  
  protected getProduct() {
    this.apiService.getProduct().subscribe((data) => {
      data.products?.forEach((item) => {
        item.isAddToCartEdit = false;
      })
      this.products.set(data.products)
      this.selectedCatagory.set(this.products())
    })
  }
  
  protected changedCatagory(catagory: any) {
    this.selectedCatagory.set(this.products())
    if (catagory === 'all') {
      this.products()
    } else {
      this.selectedCatagory.set(this.products()?.filter(p => p.category === catagory))
    }
  }

  protected filteredProduct = computed(() => {
    const term = this.searchItem().toLocaleLowerCase().trim();
    if (!term) {
      return this.selectedCatagory();
    }
    else {
      return this.selectedCatagory()?.filter((product) =>
        product.title.toLocaleLowerCase().includes(term)
        // && product.category.toLocaleLowerCase().includes(catagory)
        // ||  product.description.toLocaleLowerCase().includes(term)
      )
    }
  })


}
