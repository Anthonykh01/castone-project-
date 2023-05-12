import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
})
export class ShoppingCartComponent implements OnInit {
  cartItems: any;
  totalPrice: number;

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    const userId = JSON.parse(localStorage.getItem('user_id')); // Get user ID from localStorage
    this.getCartItems(userId);
  }

  getCartItems(userId: number) {
    this.productService.getCartItems(userId).subscribe(
      (response) => {
        this.cartItems = response.cart_items;
        this.totalPrice = this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
        localStorage.setItem('cartId', response.cart_id);
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }


  removeFromCart(item: any) {
    const userId = JSON.parse(localStorage.getItem('user_id')); // Get user ID from localStorage
    const itemId = item.id;
    console.log('Item ID:', itemId);
    console.log('User ID:', userId); // Log user ID instead of cart ID
    this.productService.removeFromCart(userId, itemId).subscribe(
      (response) => {
        console.log('Server response:', response);
        // Refresh the cart items after successful removal
        this.getCartItems(userId);
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }


  goBack() {
    this.router.navigateByUrl('/third-page');
  }
}
