import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { UUID } from 'crypto';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';
import {
  ChangeProductImageDTO,
  ChangeProductPriceDTO,
  ChangeProductStockQuantityDTO,
  CreateProductDTO,
  GetProductCrudL,
  HomeProductListDTO,
  Product,
  RemoveProductDTO,
  UpdateProductDTO,
} from '../interfaces/products';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly apiUrl = environment.baseApiUrl;
  private readonly entity = 'product';

  private readonly _http = inject(HttpClient);

  getById(id: string): Promise<Product> {
    return lastValueFrom(
      this._http.get<Product>(`${this.apiUrl}entities/${this.entity}/${id}`)
    );
  }

  getCrudl(
    filter: string = '',
    orderBy: string = '',
    pageNumber: number = 0,
    pageSize: number = 10
  ): Promise<GetProductCrudL> {
    let params = new HttpParams();
    params = params.append('filter', filter);
    params = params.append('orderby', orderBy);
    params = params.append('offset', pageNumber);
    params = params.append('size', pageSize);

    return lastValueFrom(
      this._http.get<GetProductCrudL>(`${this.apiUrl}entities/${this.entity}`, {
        params,
      })
    );
  }

  getTrendingProducts(): Promise<HomeProductListDTO> {
    return lastValueFrom(
      this._http.get<HomeProductListDTO>(
        `${this.apiUrl}queries/getTrendingProductsList`
      )
    );
  }

  getBestSellingProducts(): Promise<HomeProductListDTO> {
    return lastValueFrom(
      this._http.get<HomeProductListDTO>(
        `${this.apiUrl}queries/getBestSellingProductsList`
      )
    );
  }

  getUserSearchHistory(): Promise<HomeProductListDTO> {
    return lastValueFrom(
      this._http.get<HomeProductListDTO>(
        `${this.apiUrl}queries/getUserSearchHistory`
      )
    );
  }

  create(dto: CreateProductDTO): Promise<Product> {
    return lastValueFrom(
      this._http.post<Product>(`${this.apiUrl}/${this.entity}`, dto)
    );
  }

  edit(dto: UpdateProductDTO): Promise<Product> {
    return lastValueFrom(
      this._http.post<Product>(`${this.apiUrl}actions/updateProductCustom`, dto)
    );
  }

  changePrice(productId: UUID, price: number): Promise<Product> {
    const dto: ChangeProductPriceDTO = {
      productId,
      price,
    };

    return lastValueFrom(
      this._http.post<Product>(`${this.apiUrl}actions/editProductPrice`, dto)
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
      this._http.post<Product>(
        `${this.apiUrl}actions/editProductStockQuantity`,
        dto
      )
    );
  }

  changeImage(productId: UUID, image: string): Promise<Product> {
    const dto: ChangeProductImageDTO = {
      productId,
      image,
    };

    console.log(dto);

    return lastValueFrom(
      this._http.post<Product>(`${this.apiUrl}actions/changeProductImage`, dto)
    );
  }

  removeImage(productId: UUID): Promise<Product> {
    const dto: RemoveProductDTO = {
      productId,
    };

    return lastValueFrom(
      this._http.post<Product>(`${this.apiUrl}actions/removeProductImage`, dto)
    );
  }
}
