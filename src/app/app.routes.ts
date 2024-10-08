import { Routes } from '@angular/router';
import { AdvancedSearchPage } from './main/pages/advanced-search-page/advanced-search-page.component';
import { HomePage } from './main/pages/home-page/home-page.component';
import { LoginPage } from './main/pages/auth/login/login.component';
import { MyAccountPage } from './main/pages/my-account/my-account.component';
import { ProductDetailsPage } from './main/pages/product-details-page/product-details-page.component';
import { ShoppingCartPage } from './main/pages/shopping-cart-page/shopping-cart-page.component';
import { CreateAccountPage } from './main/pages/auth/create-account/create-account.component';

export const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'login',
    component: LoginPage,
  },
  {
    path: 'crie-sua-conta',
    component: CreateAccountPage,
  },
  {
    path: 'minha-conta',
    component: MyAccountPage,
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
