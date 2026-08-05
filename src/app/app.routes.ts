import { Routes } from '@angular/router';
import { App } from './app';
import { ProductDetails } from './components/product-details/product-details';
import { ProductGrid } from './components/product-grid/product-grid';
import { Cart } from './components/cart/cart';

export const routes: Routes = [
    {path:'', component:ProductGrid},
    {path:'details/:id', component:ProductDetails},
    {path:'cart', component:Cart}
];
