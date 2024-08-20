import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgxCurrencyDirective } from 'ngx-currency';

@Component({
  selector: 'app-change-product-stock-quantity-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    NgxCurrencyDirective,
  ],
  templateUrl: './change-product-stock-quantity-dialog.component.html',
  styleUrl: './change-product-stock-quantity-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangeProductStockQuantityDialog {
  private readonly _dialogData = inject(MAT_DIALOG_DATA);

  stockQuantityCtrl = new FormControl(this._dialogData.actualQuantity, [
    Validators.required,
    Validators.max(50000),
    Validators.min(0),
  ]);

  get getErrorMessage(): string {
    if (this.stockQuantityCtrl.hasError('required')) {
      return 'O preço é obrigatório';
    }

    if (this.stockQuantityCtrl.hasError('max')) {
      return 'O preço não pode ser maior que R$ 50.000,00';
    }

    if (this.stockQuantityCtrl.hasError('min')) {
      return 'O preço não pode ser menor que R$ 0,00';
    }

    return '';
  }
}
