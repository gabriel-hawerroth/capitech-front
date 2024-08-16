import { GetCrudL } from './generic';

export interface Category {
  id: number;
  description: string;
}

export interface GetCategoryCrudL extends GetCrudL {
  contents: Category[];
}
