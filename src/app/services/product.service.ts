/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  apiUrl = 'http://localhost/series-tracker-c1a3d0f8ef1a52af6fa3d26318305e72dae8e679/api';
  serverUrl = this.apiUrl;

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

  removeFromCart(cartId: number, itemId: number): Observable<any> {
    const apiUrl = `${this.serverUrl}/remove_item.php`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    const postData = JSON.stringify({ user_id: cartId, item_id: itemId });

    return this.http.post(apiUrl, postData, httpOptions).pipe(
      tap((response: any) => {
        console.log('Raw server response:', response); // Log raw server response
      }),
      catchError(this.handleError<any>('removeFromCart'))
    );
  }

  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
