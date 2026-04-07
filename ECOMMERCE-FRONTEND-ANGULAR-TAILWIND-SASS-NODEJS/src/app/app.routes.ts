import { Routes } from '@angular/router';
import { provideRouter, withHashLocation } from '@angular/router';
import { environment } from '../environments/environment';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  { 
    path: 'home', 
    loadComponent: () => import('./home/home.component').then(m => m.HomeComponent) 
  },

  { 
    path: 'checkout', 
    loadComponent: () => import('./pages/checkout-page/checkout-page.component').then(m => m.CheckoutPageComponent) 
  },

  { 
    path: 'meus-pedidos', 
    loadComponent: () => import('./checkout/step-review/step-review.component').then(m => m.StepReviewComponent) 
  },

  { 
    path: 'produtos', 
    loadComponent: () => import('./produtos/produtos.component').then(m => m.ProdutosComponent) 
  },

  { 
    path: 'produtos/:descricao', 
    loadComponent: () => import('./produtos/produtos.component').then(m => m.ProdutosComponent) 
  },

  { 
    path: 'produto/:id', 
    loadComponent: () => import('./produtos/detalhes-produto/detalhes-produto.component').then(m => m.DetalhesProdutoComponent) 
  },

  { 
    path: 'carrinho', 
    loadComponent: () => import('./carrinho/carrinho.component').then(m => m.CarrinhoComponent) 
  },

  { 
    path: 'servidores', 
    loadComponent: () => import('./servidores/servidores.component').then(m => m.ServidoresComponent) 
  },

  { 
    path: 'contato', 
    loadComponent: () => import('./contato/contato.component').then(m => m.ContatoComponent) 
  },

  { 
    path: '404', 
    loadComponent: () => import('./pages/nao-encontrado/nao-encontrado.component').then(m => m.NaoEncontradoComponent) 
  },

  { 
    path: '**', 
    loadComponent: () => import('./pages/nao-encontrado/nao-encontrado.component').then(m => m.NaoEncontradoComponent) 
  }
];

export const router = provideRouter(
  routes,
  ...(environment.useHash ? [withHashLocation()] : [])
);
