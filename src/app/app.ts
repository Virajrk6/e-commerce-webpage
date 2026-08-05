import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLinkActive } from '@angular/router';
import { Header } from './components/header/header';
import { ProductGrid } from './components/product-grid/product-grid';
import { Cart } from './components/cart/cart';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Revision');
}
