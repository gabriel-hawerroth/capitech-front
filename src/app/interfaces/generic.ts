import { UUID } from 'crypto';

export interface GenericIdDs {
  id: UUID;
  ds: string;
}

export interface GetCrudL {
  totalPages: number;
  totalElements: number;
  contents: any[];
}

export interface Pagination {
  page: number;
  size: number;
}
