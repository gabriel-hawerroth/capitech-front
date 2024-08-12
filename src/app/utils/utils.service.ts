import { isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { lastValueFrom } from 'rxjs';
import { ConfirmDialogComponent } from '../shared/components/confirm-dialog/confirm-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  private readonly _snackBar = inject(MatSnackBar);
  private readonly _matDialog = inject(MatDialog);

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

  showMessage(message: string, duration: number = 3000) {
    // message = this._translateService.instant(message);

    this._snackBar.open(message, '', {
      duration: duration,
    });
  }

  showMessageWithoutDuration(message: string) {
    this._snackBar.open(message, 'OK');
  }

  showConfirmDialog(message: string): Promise<boolean> {
    return lastValueFrom(
      this._matDialog
        .open(ConfirmDialogComponent, {
          data: {
            message,
          },
          autoFocus: false,
          panelClass: '.confirm-dialog',
        })
        .afterClosed()
    );
  }
}
