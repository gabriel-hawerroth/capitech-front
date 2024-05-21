import { isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { UserConfigs } from '../interfaces/user-configs';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  private readonly _translateService = inject(TranslateService);
  private _snackBar = inject(MatSnackBar);

  public isBrowser: boolean;

  constructor() {
    this.isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  }

  getItemLocalStorage(item: string): string | null {
    return this.isBrowser ? localStorage.getItem(item) : null;
  }

  setItemLocalStorage(key: string, value: string): void {
    if (this.isBrowser) localStorage.setItem(key, value);
  }

  removeItemLocalStorage(item: string): void {
    if (this.isBrowser) localStorage.removeItem(item);
  }

  setDefaultLanguage() {
    this._translateService.setDefaultLang('pt-br');
    this._translateService.use(this.getUserConfigs.language);
  }

  get getUserConfigs(): UserConfigs {
    if (this.getItemLocalStorage('savedUserConfigsCapitech')) {
      return JSON.parse(this.getItemLocalStorage('savedUserConfigsCapitech')!);
    }

    return {
      theme: 'light',
      language: 'pt-br',
    };
  }

  showMessage(message: string, duration: number = 3000) {
    message = this._translateService.instant(message);

    this._snackBar.open(message, '', {
      duration: duration,
    });
  }

  showMessageWithoutDuration(message: string) {
    message = this._translateService.instant(message);
    this._snackBar.open(message, 'OK');
  }
}
