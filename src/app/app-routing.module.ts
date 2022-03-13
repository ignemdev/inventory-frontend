import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UsuarioLoginComponent } from './usuario/usuario-login/usuario-login.component';
import { UsuarioRegisterComponent } from './usuario/usuario-register/usuario-register.component';
import { ProductoAllComponent } from './producto/producto-all/producto-all.component';
import { AppLayoutComponent } from './common/app-layout/app-layout.component';
import { UsuarioLayoutComponent } from './common/usuario-layout/usuario-layout.component';

const routes: Routes = [
  { 
    path: '',
    component: AppLayoutComponent, 
    children: [
      { path: 'productos', component: ProductoAllComponent }
    ]
  },

  { 
    path: '',
    component: UsuarioLayoutComponent, 
    children: [
      { path: 'login', component: UsuarioLoginComponent },
      { path: 'register', component: UsuarioRegisterComponent }
    ]
  },

  { path: '**', redirectTo: 'productos' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
