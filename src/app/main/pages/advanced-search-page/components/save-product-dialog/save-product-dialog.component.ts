import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { NgxCurrencyDirective } from 'ngx-currency';
import { Category } from '../../../../../interfaces/category';
import { SaveProductDTO } from '../../../../../interfaces/products';
import { ProductService } from '../../../../../services/product.service';
import { UtilsService } from '../../../../../utils/utils.service';

@Component({
  selector: 'app-save-product-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    NgxCurrencyDirective,
  ],
  templateUrl: './save-product-dialog.component.html',
  styleUrl: './save-product-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SaveProductDialog implements OnInit {
  private readonly _fb = inject(FormBuilder);
  private readonly _dialogRef = inject(MatDialogRef);
  private readonly _data = inject(MAT_DIALOG_DATA);
  private readonly _productService = inject(ProductService);
  private readonly _utils = inject(UtilsService);

  productForm!: FormGroup;

  categories: Category[] = this._data.categories;

  selectedFileName: string | null = null;
  productImageByte64: string | null = null;

  saving = signal(false);

  editing = this._data.editing;
  editingProductId: number | null = null;

  ngOnInit(): void {
    this.buildForm();

    if (this.editing) {
      this.productForm.patchValue(this._data.product);
      this.editingProductId = this._data.product.id;
    }
  }

  buildForm() {
    this.productForm = this._fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, Validators.required],
      category_id: [1, Validators.required],
      stock_quantity: [0, Validators.required],
    });
  }

  closeDialog() {
    this._dialogRef.close();
  }

  triggerFileInput() {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput.click();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFileName = input.files[0].name;

      const reader = new FileReader();
      reader.onload = () => {
        this.productImageByte64 = (reader.result as string).split(',')[1];
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  removeSelectedFile() {
    this.selectedFileName = null;
  }

  save() {
    if (this.editing) {
      this.update();
    } else {
      this.create();
    }
  }

  create() {
    if (this.productForm.invalid) {
      this._utils.showMessage('Formulário inválido');
      return;
    }

    this.saving.set(true);
    this._productService
      .create(this.getSaveProductDTO)
      .then(async (product) => {
        this._utils.showMessage('Produto salvo com sucesso', 4000);

        if (this.productImageByte64 != null) {
          await this._productService
            .changeImage(product.id!, this.productImageByte64)
            .catch(() => {
              this._utils.showMessage(
                'Houve um erro ao salvar a imagem do produto'
              );
            });
        }

        this._dialogRef.close(true);
      })
      .catch(() => {
        this._utils.showMessage('Erro ao salvar o produto');
      })
      .finally(() => this.saving.set(false));
  }

  update() {
    if (this.productForm.invalid) {
      this._utils.showMessage('Formulário inválido');
      return;
    }

    this.saving.set(true);

    this._productService
      .edit(this.editingProductId!, this.getSaveProductDTO)
      .then(() => {
        this._utils.showMessage('Produto atualizado com sucesso', 4000);
        this._dialogRef.close(true);
      })
      .catch(() => {
        this._utils.showMessage('Erro ao atualizar o produto');
      })
      .finally(() => this.saving.set(false));
  }

  get getSaveProductDTO(): SaveProductDTO {
    const formData = this.productForm.getRawValue();

    return <SaveProductDTO>{
      name: formData.name,
      description: formData.description,
      price: formData.price,
      category_id: formData.category_id,
      stock_quantity: formData.stock_quantity,
    };
  }
}
