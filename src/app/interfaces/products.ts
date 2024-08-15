import { UUID } from 'crypto';
import { Category } from './category';
import { GetCrudL } from './generic';

export interface Product {
  id?: UUID;
  name: string;
  description: string;
  price: number;
  category: Category;
  stockQuantity: number;
  image: string;
}

export interface GetProductCrudL extends GetCrudL {
  contents: Product[];
}

export interface HomeProductListDTO {
  productsList: HomeProductDTO[];
}

export interface HomeProductDTO {
  id: UUID;
  name: string;
  price: number;
  image: string;
}

export interface CreateProductDTO {
  name: string;
  description: string;
  price: number;
  category_id: number;
  stock_quantity: number;
}

export interface UpdateProductDTO {
  productId: UUID;
  product: CreateProductDTO;
}

interface CategoryId {
  id: UUID;
}

export interface ChangeProductPriceDTO {
  productId: UUID;
  price: number;
}

export interface ChangeProductStockQuantityDTO {
  productId: UUID;
  stockQuantity: number;
}

export interface ChangeProductImageDTO {
  productId: UUID;
  image: string;
}

export interface RemoveProductDTO {
  productId: string;
}
