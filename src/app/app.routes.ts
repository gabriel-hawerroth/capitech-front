import { Routes } from '@angular/router';
import { AdvancedSearchPage } from './main/pages/advanced-search-page/advanced-search-page.component';
import { HomePage } from './main/pages/home-page/home-page.component';
import { ProductDetailsPage } from './main/pages/product-details-page/product-details-page.component';
import { ShoppingCartPage } from './main/pages/shopping-cart-page/shopping-cart-page.component';

export const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'pesquisa-avancada',
    component: AdvancedSearchPage,
  },
  {
    path: 'product/:product-id',
    component: ProductDetailsPage,
    runGuardsAndResolvers: 'paramsChange',
  },
  {
    path: 'carrinho',
    component: ShoppingCartPage,
  },
];
