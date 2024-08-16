import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';
import { Category } from '../interfaces/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private readonly apiUrl = `${environment.baseApiUrl}/category`;

  private readonly _http = inject(HttpClient);

  getList(): Promise<Category[]> {
    return lastValueFrom(this._http.get<Category[]>(`${this.apiUrl}`));
  }
}
