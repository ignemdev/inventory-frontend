import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AppLayoutComponent } from './common/app-layout/app-layout.component';
import { UsuarioLayoutComponent } from './common/usuario-layout/usuario-layout.component';

import { UsuarioLoginComponent } from './usuario/usuario-login/usuario-login.component';
import { UsuarioRegisterComponent } from './usuario/usuario-register/usuario-register.component';

import { ProductoAllComponent } from './producto/producto-all/producto-all.component';
import { ProductoAddComponent } from './producto/producto-add/producto-add.component';
import { ProductoEditComponent } from './producto/producto-edit/producto-edit.component';

import { AppComponent } from './app.component';

import { AgGridModule } from 'ag-grid-angular';
import { NgSelect2Module } from 'ng-select2';

import { ProductoService } from './services/producto.service';
import { UnidadService } from './services/unidad.service';
import { BtnEditComponent } from './buttons/btn-edit.component';
import { BtnDeleteComponent } from './buttons/btn-delete.component';

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
    BtnEditComponent,
    BtnDeleteComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    AgGridModule.withComponents([BtnEditComponent, BtnDeleteComponent]),
    NgSelect2Module
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    ProductoService,
    UnidadService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
