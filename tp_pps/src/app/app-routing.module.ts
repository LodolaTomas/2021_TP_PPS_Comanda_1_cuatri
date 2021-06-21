import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { SplashComponent } from './pages/splash/splash.component';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'splash',
    pathMatch: 'full'
  },
  {
    path:'splash',
    component:SplashComponent
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)

  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'alta-producto',
    loadChildren: () => import('./pages/alta-producto/alta-producto.module').then( m => m.AltaProductoPageModule)
  },
  {
    path: 'alta-mesa',
    loadChildren: () => import('./pages/alta-mesa/alta-mesa.module').then( m => m.AltaMesaPageModule)
  },

  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'alta-producto',
    loadChildren: () => import('./pages/alta-producto/alta-producto.module').then( m => m.AltaProductoPageModule)
  },
  {
    path: 'supervisor',
    loadChildren: () => import('./pages/supervisor/supervisor.module').then( m => m.SupervisorPageModule)
  },
  {
    path: 'adm-usuarios',
    loadChildren: () => import('./pages/supervisor/adm-usuarios/adm-usuarios.module').then( m => m.AdmUsuariosPageModule)
  },
  {
    path: 'home-clientes',
    loadChildren: () => import('./pages/home-clientes/home-clientes.module').then( m => m.HomeClientesPageModule)
  },
  {
    path: 'lista-espera-mesas',
    loadChildren: () => import('./pages/lista-espera-mesas/lista-espera-mesas.module').then( m => m.ListaEsperaMesasPageModule)
  }
  ,
  {
    path: 'modal',
    loadChildren: () => import('./pages/modal/modal.module').then( m => m.ModalPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
