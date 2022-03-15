import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UsuarioLoginComponent } from '../components/usuario/usuario-login/usuario-login.component';
import { UsuarioRegisterComponent } from '../components/usuario/usuario-register/usuario-register.component';
import { ProductoAllComponent } from '../components/producto/producto-all/producto-all.component';
import { AppLayoutComponent } from '../components/shared/app-layout/app-layout.component';
import { UsuarioLayoutComponent } from '../components/shared/usuario-layout/usuario-layout.component';

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
