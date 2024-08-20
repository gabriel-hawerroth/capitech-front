import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgxCurrencyDirective } from 'ngx-currency';

@Component({
  selector: 'app-change-product-price-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    NgxCurrencyDirective,
  ],
  templateUrl: './change-product-price-dialog.component.html',
  styleUrl: './change-product-price-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangeProductPriceDialog {
  private readonly _dialogData = inject(MAT_DIALOG_DATA);

  priceCtrl = new FormControl(this._dialogData.actualPrice, [
    Validators.required,
    Validators.max(50000),
    Validators.min(0),
  ]);

  get getErrorMessage(): string {
    if (this.priceCtrl.hasError('required')) {
      return 'O preço é obrigatório';
    }

    if (this.priceCtrl.hasError('max')) {
      return 'O preço não pode ser maior que R$ 50.000,00';
    }

    if (this.priceCtrl.hasError('min')) {
      return 'O preço não pode ser menor que R$ 0,00';
    }

    return '';
  }
}
