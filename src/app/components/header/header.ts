import { Component, inject, input, output} from '@angular/core';
import { MatButton, MatIconButton, MatFabButton, MatMiniFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';
import { CartService } from '../../services/cart/cart-service';
import { MatBadge } from '@angular/material/badge';
import { Cart } from '../cart/cart';
import { RouterLink, RouterOutlet, RouterLinkActive, Router } from "@angular/router";


@Component({
  selector: 'app-header',
  imports: [MatToolbar, MatIcon, MatButton, MatBadge],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  
  router = inject(Router)
  cartService =inject(CartService);
  
  redirectHome(){
    this.router.navigateByUrl('')
  }
  cartRoute(){
    this.router.navigateByUrl('/cart')
  }
}
