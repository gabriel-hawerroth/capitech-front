import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { HomeProductDTO } from '../../../interfaces/products';
import { ProductService } from '../../../services/product.service';
import { ProductsListComponent } from '../../../shared/components/products-list/products-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductsListComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage implements OnInit {
  private readonly _productService = inject(ProductService);

  trendingProductsList = signal<HomeProductDTO[]>([]);
  bestSellingProductsList = signal<HomeProductDTO[]>([]);

  ngOnInit(): void {
    this._productService
      .getTrendingProducts()
      .then((response) => this.trendingProductsList.set(response));
    // this._productService
    //   .getBestSellingProducts()
    //   .then((response) =>
    //     this.bestSellingProductsList.set(response.productsList)
    //   );
  }
}
