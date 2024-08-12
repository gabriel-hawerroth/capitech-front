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
  private readonly apiUrl = environment.baseApiUrl;
  private readonly entity = 'shoppingCart';

  private readonly _http = inject(HttpClient);

  addProduct(productId: string, quantity: number): Promise<any> {
    quantity = Math.round(quantity);

    const dto: CreateShoppingCartDTO = {
      product: {
        id: productId,
      },
      quantity,
    };
    return lastValueFrom(
      this._http.post(`${this.apiUrl}entities/${this.entity}`, dto)
    );
  }

  getUserShoppingCart(): Promise<ShoppingCartList> {
    return lastValueFrom(
      this._http.get<ShoppingCartList>(
        `${this.apiUrl}queries/getUserShoppingCart`
      )
    );
  }
}
