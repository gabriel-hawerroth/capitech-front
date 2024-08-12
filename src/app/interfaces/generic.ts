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
