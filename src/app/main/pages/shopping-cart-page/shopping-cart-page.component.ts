import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgxMaskDirective } from 'ngx-mask';
import { ShoppingCartItem } from '../../../interfaces/shopping-cart';
import { ShoppingCartService } from '../../../services/shopping-cart.service';
import { CustomCurrencyPipe } from '../../../shared/pipes/custom-currency.pipe';
import { ShoppingCartItemsListComponent } from './components/shopping-cart-items-list/shopping-cart-items-list.component';

@Component({
  selector: 'app-shopping-cart-page',
  standalone: true,
  imports: [
    ShoppingCartItemsListComponent,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDividerModule,
    CustomCurrencyPipe,
    NgxMaskDirective,
  ],
  templateUrl: './shopping-cart-page.component.html',
  styleUrl: './shopping-cart-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShoppingCartPage implements OnInit {
  private readonly _shoppingCartService = inject(ShoppingCartService);

  cartItems = signal<ShoppingCartItem[]>([]);

  cepControl = new FormControl('');

  readonly purchaseTotalPrice = signal(0);

  ngOnInit(): void {
    // this._shoppingCartService.getUserShoppingCart().then((response) => {
    //   this.cartItems.set(response.items);
    //   this.purchaseTotalPrice.set(
    //     response.items.reduce(
    //       (count, item) => count + item.productPrice * item.quantity,
    //       0
    //     )
    //   );
    // });
  }
}
