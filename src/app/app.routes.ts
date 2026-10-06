import { Routes } from '@angular/router';
import { App } from './app';
import { ProductDetails } from './components/product-details/product-details';
import { ProductGrid } from './components/product-grid/product-grid';
import { Cart } from './components/cart/cart';
import { Login } from './components/login/login';

export const routes: Routes = [
    {path:'', component:ProductGrid},
    {path:'details/:id', component:ProductDetails},
    {path:'cart', component:Cart},
    {path:'login', component:Login},
    {path:'user',component:ProductGrid},
    {path:'admin',component:ProductGrid}
];
