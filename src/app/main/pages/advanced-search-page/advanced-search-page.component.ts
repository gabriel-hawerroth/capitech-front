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
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { debounceTime, lastValueFrom } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Category } from '../../../interfaces/category';
import { Pagination } from '../../../interfaces/generic';
import {
  HomeProductDTO,
  Product,
  ProductQueryParams,
} from '../../../interfaces/products';
import { CategoryService } from '../../../services/category.service';
import { ProductService } from '../../../services/product.service';
import { ProductsListComponent } from '../../../shared/components/products-list/products-list.component';
import { SaveProductDialog } from './components/save-product-dialog/save-product-dialog.component';

@Component({
  selector: 'app-advanced-search-page',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    ProductsListComponent,
    MatDividerModule,
    MatSliderModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatPaginatorModule,
  ],
  templateUrl: './advanced-search-page.component.html',
  styleUrl: './advanced-search-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdvancedSearchPage implements OnInit {
  private readonly _matDialog = inject(MatDialog);
  private readonly _categoryService = inject(CategoryService);
  private readonly _productService = inject(ProductService);
  private readonly _fb = inject(FormBuilder);

  isProductionEnv = environment.production;

  categories = signal<Category[]>([]);
  products = signal<Product[]>([]);

  minPriceFilter = new FormControl(0);
  maxPriceFilter = new FormControl(50000);

  filterForm!: FormGroup;

  totalElements = signal(0);
  pageNumber = signal(0);
  pageSize = signal(10);

  ngOnInit(): void {
    this.buildForm();
    this.getCategories();
    this.getFilteredProductsList();
  }

  buildForm() {
    this.filterForm = this._fb.group({
      name: undefined,
      minPrice: 0,
      maxPrice: 50000,
      categories: [],
    });

    this.filterForm.valueChanges
      .pipe(debounceTime(300))
      .subscribe(() => this.getFilteredProductsList());
  }

  getCategories() {
    this._categoryService.getList().then((response) => {
      this.categories.set(response);
    });
  }

  handlePageEvent(e: PageEvent) {
    this.pageNumber.set(e.pageIndex);
    this.pageSize.set(e.pageSize);
    this.getFilteredProductsList();
  }

  getFilteredProductsList() {
    const filters = this.filterForm.getRawValue();
    if (!filters.name) {
      filters.name = undefined;
    }

    const pagination: Pagination = {
      page: this.pageNumber(),
      size: this.pageSize(),
    };

    const queryParams: ProductQueryParams = {
      filters,
      pagination,
    };

    this._productService.getFilteredProducts(queryParams).then((response) => {
      this.products.set(response.content);
      this.totalElements.set(response.totalItems);
    });
  }

  concatFilterParam(filter: string): string {
    return `${filter} and `;
  }

  openAddProductDialog(product?: HomeProductDTO | Product) {
    lastValueFrom(
      this._matDialog
        .open(SaveProductDialog, {
          width: '40vw',
          minWidth: '40vw',
          maxHeight: '90vh',
          autoFocus: false,
          data: {
            categories: this.categories(),
            editing: product != undefined,
            product,
          },
        })
        .afterClosed()
    ).then((response) => {
      if (!response) return;

      this.getFilteredProductsList();
    });
  }
}
