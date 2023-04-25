import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { tap } from 'rxjs/operators';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-third-page',
  templateUrl: './third-page.page.html',
  styleUrls: ['./third-page.page.scss'],
})
export class ThirdPagePage implements OnInit {
  user: any;
  categories: any;
  products: any;
  productsByCategory: any;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  user_id: any;

  constructor(private productService: ProductService , private toastController: ToastController, private router: Router) { }

  ngOnInit() {
    this.user = localStorage.getItem('email');
    this.user_id = parseInt(localStorage.getItem('user_id'), 10);

    this.getProducts();
  }
  getProducts() {
    this.productService.getProducts().subscribe(
      (response) => {
        console.log('Response:', response); // Debugging line
        this.productsByCategory = response.categories;
        this.categories = Object.keys(this.productsByCategory);
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color: 'success',
    });
    toast.present();
  }


  // ...
  addToCart(productId: number) {
    const userId = localStorage.getItem('user_id'); // Get the user ID from the local storage

    if (!userId) {
      console.log('User not logged in');
      this.presentToast('Please log in to add items to your cart');
      return;
    }
    this.productService
      .addToCart(this.user_id, productId)
      .pipe(
        tap((response) => {
          console.log('Response:', response);
        })
      )
      .subscribe(
        (data) => {
          console.log('Item added to cart:', data);
          this.presentToast('Item added to cart');
        },
        (error) => {
          console.log('Error:', error);
          this.presentToast('Failed to add item to cart');
        }
      );
  }
  viewCart() {
    this.router.navigateByUrl('/shopping-cart');
  }


}
