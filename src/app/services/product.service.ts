import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';
import { PaginationResponse } from '../interfaces/generic';
import {
  ChangeProductImageDTO,
  ChangeProductPriceDTO,
  ChangeProductStockQuantityDTO,
  SaveProductDTO,
  HomeProductListDTO,
  Product,
  ProductQueryParams,
} from '../interfaces/products';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly apiUrl = `${environment.baseApiUrl}/product`;

  private readonly _http = inject(HttpClient);

  getById(id: number): Promise<Product> {
    return lastValueFrom(this._http.get<Product>(`${this.apiUrl}/${id}`));
  }

  getFilteredProducts(
    queryParams: ProductQueryParams
  ): Promise<PaginationResponse<Product>> {
    let params = new HttpParams();
    params = params.append('filters', JSON.stringify(queryParams.filters));
    params = params.append(
      'pagination',
      JSON.stringify(queryParams.pagination)
    );

    return lastValueFrom(
      this._http.get<PaginationResponse<Product>>(`${this.apiUrl}`, { params })
    );
  }

  getTrendingProducts(): Promise<HomeProductListDTO> {
    return lastValueFrom(
      this._http.get<HomeProductListDTO>(
        `${this.apiUrl}/getTrendingProductsList`
      )
    );
  }

  getBestSellingProducts(): Promise<HomeProductListDTO> {
    return lastValueFrom(
      this._http.get<HomeProductListDTO>(
        `${this.apiUrl}/getBestSellingProductsList`
      )
    );
  }

  getUserSearchHistory(): Promise<HomeProductListDTO> {
    return lastValueFrom(
      this._http.get<HomeProductListDTO>(`${this.apiUrl}/getUserSearchHistory`)
    );
  }

  create(dto: SaveProductDTO): Promise<Product> {
    return lastValueFrom(this._http.post<Product>(`${this.apiUrl}`, dto));
  }

  edit(productId: number, dto: SaveProductDTO): Promise<Product> {
    return lastValueFrom(
      this._http.put<Product>(`${this.apiUrl}/${productId}`, dto)
    );
  }

  changePrice(productId: number, price: number): Promise<Product> {
    const dto: ChangeProductPriceDTO = {
      productId,
      price,
    };

    return lastValueFrom(
      this._http.put<Product>(`${this.apiUrl}/editProductPrice`, dto)
    );
  }

  changeStockQuantity(
    productId: number,
    stockQuantity: number
  ): Promise<Product> {
    const dto: ChangeProductStockQuantityDTO = {
      productId,
      stockQuantity,
    };

    return lastValueFrom(
      this._http.post<Product>(`${this.apiUrl}/editProductStockQuantity`, dto)
    );
  }

  changeImage(productId: number, image: File): Promise<void> {
    const formData = new FormData();
    formData.append('image', image);

    return lastValueFrom(
      this._http.patch<void>(
        `${this.apiUrl}/changeProductImage/${productId}`,
        formData
      )
    );
  }

  removeImage(productId: number): Promise<void> {
    return lastValueFrom(
      this._http.patch<void>(
        `${this.apiUrl}/removeProductImage/${productId}`,
        null
      )
    );
  }
}
