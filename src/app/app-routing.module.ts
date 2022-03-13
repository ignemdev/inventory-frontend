import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UsuarioLoginComponent } from './usuario/usuario-login/usuario-login.component';
import { UsuarioRegisterComponent } from './usuario/usuario-register/usuario-register.component';
import { ProductoAllComponent } from './producto/producto-all/producto-all.component';
import { AppLayoutComponent } from './common/app-layout/app-layout.component';
import { UsuarioLayoutComponent } from './common/usuario-layout/usuario-layout.component';

import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent, canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'productos', pathMatch: 'full' },
      { path: 'productos', component: ProductoAllComponent, canActivate: [AuthGuard] },
      { path: 'entradas', component: ProductoAllComponent, canActivate: [AuthGuard] }
    ],
  },

  {
    path: '',
    component: UsuarioLayoutComponent,
    children: [
      { path: 'login', component: UsuarioLoginComponent },
      { path: 'register', component: UsuarioRegisterComponent }
    ]
  },

  { path: '**', redirectTo: 'productos' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
