import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, OnInit, inject, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { HomeProductDTO, Product } from '../../../interfaces/products';
import { ProductService } from '../../../services/product.service';
import { UtilsService } from '../../../utils/utils.service';
import { CustomCurrencyPipe } from '../../pipes/custom-currency.pipe';
import { ChangeProductPriceDialog } from './components/change-product-price-dialog/change-product-price-dialog.component';
import { ChangeProductStockQuantityDialog } from './components/change-product-stock-quantity-dialog/change-product-stock-quantity-dialog.component';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [
    CommonModule,
    NgOptimizedImage,
    CustomCurrencyPipe,
    RouterModule,
    MatButtonModule,
    MatMenuModule,
  ],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss',
  providers: [],
})
export class ProductsListComponent implements OnInit {
  updateList = output();
  editProduct = output<HomeProductDTO | Product>();

  sectionName = input.required<string>();
  sectionIcon = input.required<string>();
  productsList = input.required<HomeProductDTO[] | Product[]>();

  private readonly _productService = inject(ProductService);
  private readonly _utils = inject(UtilsService);
  private readonly _router = inject(Router);
  private readonly _matDialog = inject(MatDialog);
  private readonly _activatedRoute = inject(ActivatedRoute);

  isProductionEnv = environment.production;
  isHomePage = true;

  selectedProductId: number | null = null;

  ngOnInit(): void {
    const currentRoute = this._activatedRoute.snapshot.url
      .map((segment) => segment.path)
      .join('/');

    this.isHomePage = currentRoute === '';
  }

  navigate(productId: number, event: Event) {
    const clickedOnActionsBtn = (event.target as HTMLElement).closest(
      '.actions-btn'
    );
    if (clickedOnActionsBtn) return;

    this._router.navigateByUrl('/product/' + productId);
  }

  openChangePriceDialog(productId: number, actualPrice: number) {
    lastValueFrom(
      this._matDialog
        .open(ChangeProductPriceDialog, {
          data: {
            actualPrice,
          },
          width: '22vw',
          minWidth: '22vw',
        })
        .afterClosed()
    ).then((response: number) => {
      if (!response) return;

      this._utils.showMessage('Enviando');

      this._productService
        .changePrice(productId, response)
        .then(() => {
          this._utils.showMessage('Preço atualizado com sucesso');
          this.updateList.emit();
        })
        .catch(() => {
          this._utils.showMessage('Erro ao tentar atualizar o preço');
        });
    });
  }

  openChangeStockQuantityDialog(productId: number) {
    lastValueFrom(
      this._matDialog
        .open(ChangeProductStockQuantityDialog, {
          width: '22vw',
          minWidth: '22vw',
        })
        .afterClosed()
    ).then((response: number) => {
      if (!response) return;

      this._utils.showMessage('Enviando');

      this._productService
        .changeStockQuantity(productId, response)
        .then(() => {
          this._utils.showMessage(
            'Quantidade em estoque atualizada com sucesso'
          );
          this.updateList.emit();
        })
        .catch(() => {
          this._utils.showMessage(
            'Erro ao tentar atualizar a quantidade em estoque'
          );
        });
    });
  }

  triggerFileInput(productId: number) {
    this.selectedProductId = productId;

    const fileInput = document.getElementById(
      'productsListfileInput'
    ) as HTMLInputElement;
    fileInput.click();
  }

  onFileSelected(event: any) {
    const file = event?.target.files[0];
    if (!file) return;

    this._utils.showMessage('Enviando');
    this._productService
      .changeImage(this.selectedProductId!, file)
      .then(() => {
        this._utils.showMessage('Imagem adicionada com sucesso');
        this.updateList.emit();
      })
      .catch(() => {
        this._utils.showMessage('Houve um erro ao salvar a imagem do produto');
      })
      .finally(() => (this.selectedProductId = null));
  }

  removeImage(productId: number) {
    this._utils
      .showConfirmDialog('Deseja realmente excluir a imagem desse produto?')
      .then((response) => {
        if (!response) return;

        this._utils.showMessage('Enviando');

        this._productService
          .removeImage(productId)
          .then(() => {
            this._utils.showMessage('Imagem removida com sucesso');
            this.updateList.emit();
          })
          .catch(() =>
            this._utils.showMessage('Erro ao tentar remover a imagem')
          );
      });
  }
}
