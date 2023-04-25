/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  apiUrl = 'http://localhost/series-tracker-c1a3d0f8ef1a52af6fa3d26318305e72dae8e679/api';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/fetch_products.php`);
  }

  addToCart(userId: number, productId: number): Observable<any> {
    const data = {
      user_id: userId,
      product_id: productId,
    };
    return this.http.post<any>(`${this.apiUrl}/manage_cart.php`, data).pipe(
      tap((response) => {
        console.log('Raw response:', response);
      })
    );
  }
  getCartItems(userId: number): Observable<any> {
    const data = {
      user_id: userId,
    };
    return this.http.post<any>(`${this.apiUrl}/fetch_cart_items.php`, data);
  }
}

