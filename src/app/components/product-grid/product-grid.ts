import { Component, computed, signal, inject } from '@angular/core';
import { ProductCard } from '../product-card/product-card';
import { MatIcon } from '@angular/material/icon';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Api } from '../../services/api';
import { Products } from '../../services/products';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart/cart-service';
import { RouterOutlet } from '@angular/router';
import { Header } from '../header/header';
import { MatOption, MatSelect } from '@angular/material/select';

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
