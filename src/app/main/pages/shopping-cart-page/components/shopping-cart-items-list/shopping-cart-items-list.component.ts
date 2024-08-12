import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ShoppingCartItem } from '../../../../../interfaces/shopping-cart';
import { CustomCurrencyPipe } from '../../../../../shared/pipes/custom-currency.pipe';

@Component({
  selector: 'app-shopping-cart-items-list',
  standalone: true,
  imports: [
    CommonModule,
    NgOptimizedImage,
    MatButtonModule,
    CustomCurrencyPipe,
  ],
  templateUrl: './shopping-cart-items-list.component.html',
  styleUrl: './shopping-cart-items-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShoppingCartItemsListComponent {
  cartItems = input.required<ShoppingCartItem[]>();
}
