import { CommonModule, NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Product } from '../../../interfaces/products';
import { ProductService } from '../../../services/product.service';
import { ShoppingCartService } from '../../../services/shopping-cart.service';
import { UserNavigationHistoryComponent } from '../../../shared/components/user-navigation-history/user-navigation-history.component';
import { CustomCurrencyPipe } from '../../../shared/pipes/custom-currency.pipe';
import { UtilsService } from '../../../utils/utils.service';

@Component({
  selector: 'app-product-details-page',
  standalone: true,
  imports: [
    CommonModule,
    NgOptimizedImage,
    MatDividerModule,
    CustomCurrencyPipe,
    MatButtonModule,
    UserNavigationHistoryComponent,
  ],
  templateUrl: './product-details-page.component.html',
  styleUrl: './product-details-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CustomCurrencyPipe],
})
export class ProductDetailsPage implements OnInit {
  private readonly _productService = inject(ProductService);
  private readonly _shoppingCartService = inject(ShoppingCartService);
  private readonly _currencyPipe = inject(CustomCurrencyPipe);
  private readonly _utils = inject(UtilsService);
  private readonly _activatedRoute = inject(ActivatedRoute);
  private readonly _router = inject(Router);
  private readonly _sanitizer = inject(DomSanitizer);

  productId: string | null = null;
  product = signal<Product | null>(null);

  creditCardFlags = ['visa', 'mastercard', 'dn', 'ae', 'elo', 'hiper'];
  firtColumnInstallments = [1, 2, 3, 4, 5, 6];
  secondColumnInstallments = [7, 8, 9, 10, 11, 12];

  htmlDescription?: SafeHtml;

  ngOnInit(): void {
    this._activatedRoute.params.subscribe((params: Params) => {
      this.productId = params['product-id'];
      this.loadProductDetails();
    });
  }

  loadProductDetails() {
    if (!this.productId) {
      this._router.navigateByUrl('/');
      return;
    }

    this._productService.getById(this.productId).then((response) => {
      this.product.set(response);

      if (response.description) {
        this.htmlDescription = this._sanitizer.bypassSecurityTrustHtml(
          response.description
        );
      }
    });
  }

  addProductToShoppingCart() {
    this._shoppingCartService.addProduct(this.productId!, 1).then(() => {
      this._utils.showMessage('Produto adicionado ao carrinho com sucesso');
      this._router.navigateByUrl('/carrinho');
    });
  }

  getInstallmentLabel(installmentsNumber: number): string {
    if (!this.product()) {
      return '';
    }

    const installmentPrice = this._currencyPipe.transform(
      this.product()!.price / installmentsNumber
    );

    return `${installmentsNumber}x de R$${installmentPrice}`;
  }
}
