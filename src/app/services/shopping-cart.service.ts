import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';
import {
  CreateShoppingCartDTO,
  ShoppingCartList,
} from '../interfaces/shopping-cart';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  private readonly apiUrl = `${environment.baseApiUrl}/shoppingCart`;

  private readonly _http = inject(HttpClient);

  addProduct(productId: number, quantity: number): Promise<any> {
    quantity = Math.round(quantity);

    const dto: CreateShoppingCartDTO = {
      productId,
      quantity,
    };
    return lastValueFrom(this._http.post(`${this.apiUrl}`, dto));
  }

  getUserShoppingCart(): Promise<ShoppingCartList> {
    return lastValueFrom(
      this._http.get<ShoppingCartList>(`${this.apiUrl}/getUserShoppingCart`)
    );
  }
}
