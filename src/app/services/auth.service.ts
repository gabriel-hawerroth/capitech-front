import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { UtilsService } from '../utils/utils.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl = `${environment.baseApiUrl}/auth`;

  private readonly _http = inject(HttpClient);
  private readonly _utilsService = inject(UtilsService);

  get logged(): boolean {
    return Boolean(this._utilsService.getItemLocalStorage('token'));
  }
}
