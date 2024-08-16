import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { UUID } from 'crypto';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';
import { PaginationResponse } from '../interfaces/generic';
import {
  ChangeProductImageDTO,
  ChangeProductPriceDTO,
  ChangeProductStockQuantityDTO,
  CreateProductDTO,
  HomeProductListDTO,
  Product,
  ProductQueryParams,
  RemoveProductDTO,
  UpdateProductDTO,
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

  create(dto: CreateProductDTO): Promise<Product> {
    return lastValueFrom(this._http.post<Product>(`${this.apiUrl}`, dto));
  }

  edit(dto: UpdateProductDTO): Promise<Product> {
    return lastValueFrom(
      this._http.post<Product>(`${this.apiUrl}/updateProductCustom`, dto)
    );
  }

  changePrice(productId: UUID, price: number): Promise<Product> {
    const dto: ChangeProductPriceDTO = {
      productId,
      price,
    };

    return lastValueFrom(
      this._http.post<Product>(`${this.apiUrl}/editProductPrice`, dto)
    );
  }

  changeStockQuantity(
    productId: UUID,
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

  changeImage(productId: UUID, image: string): Promise<Product> {
    const dto: ChangeProductImageDTO = {
      productId,
      image,
    };

    console.log(dto);

    return lastValueFrom(
      this._http.post<Product>(`${this.apiUrl}/changeProductImage`, dto)
    );
  }

  removeImage(productId: UUID): Promise<Product> {
    const dto: RemoveProductDTO = {
      productId,
    };

    return lastValueFrom(
      this._http.post<Product>(`${this.apiUrl}/removeProductImage`, dto)
    );
  }
}
