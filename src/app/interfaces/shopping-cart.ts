import { UUID } from 'crypto';

export interface ShoppingCart {
  id?: UUID;
  username: string;
  product: string; //uuid
  quantity: number;
}

export interface CreateShoppingCartDTO {
  product: ProductId;
  quantity: number;
}

interface ProductId {
  id: string;
}

export interface ShoppingCartList {
  items: ShoppingCartItem[];
}

export interface ShoppingCartItem {
  id: UUID;
  quantity: number;
  productName: string;
  productPrice: number;
  productImage: string;
}
