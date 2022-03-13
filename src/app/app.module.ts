import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { UsuarioLoginComponent } from './usuario/usuario-login/usuario-login.component';
import { UsuarioRegisterComponent } from './usuario/usuario-register/usuario-register.component';
import { ProductoAllComponent } from './producto/producto-all/producto-all.component';
import { ProductoAddComponent } from './producto/producto-add/producto-add.component';
import { ProductoEditComponent } from './producto/producto-edit/producto-edit.component';
import { AppLayoutComponent } from './common/app-layout/app-layout.component';
import { AppComponent } from './app.component';
import { UsuarioLayoutComponent } from './common/usuario-layout/usuario-layout.component';

@NgModule({
  declarations: [
    AppComponent,
    UsuarioLoginComponent,
    UsuarioRegisterComponent,
    ProductoAllComponent,
    ProductoAddComponent,
    ProductoEditComponent,
    AppLayoutComponent,
    UsuarioLayoutComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
