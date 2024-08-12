import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';
import { GetCategoryCrudL } from '../interfaces/category';
import { GetCrudL } from '../interfaces/generic';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private apiUrl = environment.baseApiUrl;
  private entity = 'productCategory';

  private readonly _http = inject(HttpClient);

  getList(): Promise<GetCategoryCrudL> {
    return lastValueFrom(
      this._http.get<GetCrudL>(`${this.apiUrl}entities/${this.entity}`)
    );
  }
}
