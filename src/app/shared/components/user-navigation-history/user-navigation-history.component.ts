import { NgOptimizedImage } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
  output,
  signal,
} from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { UUID } from 'crypto';
import { HomeProductDTO } from '../../../interfaces/products';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-user-navigation-history',
  standalone: true,
  imports: [NgOptimizedImage, RouterModule, MatTooltipModule],
  templateUrl: './user-navigation-history.component.html',
  styleUrl: './user-navigation-history.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserNavigationHistoryComponent implements OnInit {
  onSelectItem = output<UUID>();

  private readonly _productService = inject(ProductService);

  products = signal<HomeProductDTO[]>([]);

  ngOnInit(): void {
    this._productService.getUserSearchHistory().then((response) => {
      this.products.set(response.productsList);
    });
  }

  selectItem(id: UUID) {
    this.onSelectItem.emit(id);
    this.products.set([]);
    this.ngOnInit();
  }
}