
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { SplashComponent } from './pages/splash/splash.component';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'splash',
    pathMatch: 'full'
  },
  {
    path: 'splash',
    component: SplashComponent
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)

  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'alta-producto',
    loadChildren: () => import('./pages/alta-producto/alta-producto.module').then(m => m.AltaProductoPageModule)
  },
  {
    path: 'alta-mesa',
    loadChildren: () => import('./pages/alta-mesa/alta-mesa.module').then(m => m.AltaMesaPageModule)
  },

  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'alta-producto',
    loadChildren: () => import('./pages/alta-producto/alta-producto.module').then(m => m.AltaProductoPageModule)
  },
  {
    path: 'supervisor',
    loadChildren: () => import('./pages/supervisor/supervisor.module').then(m => m.SupervisorPageModule)
  },
  {
    path: 'adm-usuarios',
    loadChildren: () => import('./pages/supervisor/adm-usuarios/adm-usuarios.module').then(m => m.AdmUsuariosPageModule)
  },
  {
    path: 'home-clientes',
    loadChildren: () => import('./pages/home-clientes/home-clientes.module').then(m => m.HomeClientesPageModule)
  },
  {
    path: 'lista-espera-mesas',
    loadChildren: () => import('./pages/lista-espera-mesas/lista-espera-mesas.module').then(m => m.ListaEsperaMesasPageModule)
  }
  ,
  {
    path: 'modal',
    loadChildren: () => import('./pages/modal/modal.module').then(m => m.ModalPageModule)
  },
  {
    path: 'cartfood',
    loadChildren: () => import('./component/cartfood/cartfood.module').then(m => m.CartfoodPageModule)
  },
  {
    path: 'metre',
    loadChildren: () => import('./pages/metre/metre.module').then(m => m.MetrePageModule)
  },
  {
    path: 'consultas',
    loadChildren: () => import('./pages/consultas/consultas.module').then(m => m.ConsultasPageModule)
  },
  {
    path: 'adm-consultas',
    loadChildren: () => import('./pages/mozo/adm-consultas/adm-consultas.module').then(m => m.AdmConsultasPageModule)
  },
  {
    path: 'mozo',
    loadChildren: () => import('./pages/mozo/mozo.module').then(m => m.MozoPageModule)
  },
  {
    path: 'adm-pedidos',
    loadChildren: () => import('./pages/mozo/adm-pedidos/adm-pedidos.module').then(m => m.AdmPedidosPageModule)
  },
  {
    path: 'juegos',
    loadChildren: () => import('./pages/juegos/juegos.module').then(m => m.JuegosPageModule)
  },
  {
    path: 'encuesta',
    loadChildren: () => import('./pages/encuesta/encuesta.module').then(m => m.EncuestaPageModule)
  },
  {
    path: 'cocinero',
    loadChildren: () => import('./pages/cocinero/cocinero.module').then(m => m.CocineroPageModule)
  },
  {
    path: 'adm-platos',
    loadChildren: () => import('./pages/cocinero/adm-platos/adm-platos.module').then(m => m.AdmPlatosPageModule)
  },
  {
    path: 'bartender',
    loadChildren: () => import('./pages/bartender/bartender.module').then( m => m.BartenderPageModule)
  },
  {
    path: 'adm-bebidas',
    loadChildren: () => import('./pages/bartender/adm-bebidas/adm-bebidas.module').then(m => m.AdmBebidasPageModule)
  },  {
    path: 'resultados',
    loadChildren: () => import('./encuesta/resultados/resultados.module').then( m => m.ResultadosPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
