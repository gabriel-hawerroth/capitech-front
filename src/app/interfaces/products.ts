import { Category } from './category';
import { GetCrudL, Pagination } from './generic';

export interface Product {
  id?: number;
  name: string;
  description: string;
  price: number;
  category: Category;
  stockQuantity: number;
  image: string;
}

export interface ProductFilter {
  name: string;
  minPrice: number;
  maxPrice: number;
  categories: number[];
}

export interface ProductQueryParams {
  filters: ProductFilter;
  pagination: Pagination;
}

export interface GetProductCrudL extends GetCrudL {
  contents: Product[];
}

export interface HomeProductListDTO {
  productsList: HomeProductDTO[];
}

export interface HomeProductDTO {
  id: number;
  name: string;
  price: number;
  image: string;
}

export interface SaveProductDTO {
  name: string;
  description: string;
  price: number;
  category_id: number;
  stock_quantity: number;
}

export interface ChangeProductPriceDTO {
  productId: number;
  price: number;
}

export interface ChangeProductStockQuantityDTO {
  productId: number;
  stockQuantity: number;
}

export interface ChangeProductImageDTO {
  productId: number;
  image: string;
}
