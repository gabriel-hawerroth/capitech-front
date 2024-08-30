import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { UtilsService } from '../utils/utils.service';
import { lastValueFrom } from 'rxjs';

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

  login(mail: string, password: string) {
    let params = new HttpParams();
    params = params.append('email', mail);
    params = params.append('password', password);

    return lastValueFrom(
      this._http.post(`${this.apiUrl}/login`, null, { params })
    );
  }
}
