import { UUID } from 'crypto';
import { GetCrudL } from './generic';

export interface Category {
  id: UUID;
  description: string;
}

export interface GetCategoryCrudL extends GetCrudL {
  contents: Category[];
}
