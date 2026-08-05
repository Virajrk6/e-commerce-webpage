import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Ratings { 
  getStarType(index: number, rating: number): string {
  if (rating >= index) {
    return 'star';
  }

  if (rating >= index - 0.5) {
    return 'star_half';
  }

  return 'star_border';
}
}
