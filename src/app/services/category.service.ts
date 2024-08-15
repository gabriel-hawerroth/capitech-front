import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';
import { Category, GetCategoryCrudL } from '../interfaces/category';
import { GetCrudL } from '../interfaces/generic';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private apiUrl = environment.baseApiUrl;
  private entity = 'category';

  private readonly _http = inject(HttpClient);

  getList(): Promise<Category[]> {
    return lastValueFrom(
      this._http.get<Category[]>(`${this.apiUrl}/${this.entity}`)
    );
  }
}
