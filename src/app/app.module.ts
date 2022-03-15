import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AppLayoutComponent } from './components/shared/app-layout/app-layout.component';
import { UsuarioLayoutComponent } from './components/shared/usuario-layout/usuario-layout.component';

import { UsuarioLoginComponent } from './components/usuario/usuario-login/usuario-login.component';
import { UsuarioRegisterComponent } from './components/usuario/usuario-register/usuario-register.component';

import { ProductoAllComponent } from './components/producto/producto-all/producto-all.component';
import { ProductoAddComponent } from './components/producto/producto-add/producto-add.component';
import { ProductoEditComponent } from './components/producto/producto-edit/producto-edit.component';

import { AppComponent } from './app.component';

import { AgGridModule } from 'ag-grid-angular';
import { NgSelect2Module } from 'ng-select2';

import { ProductoService } from './services/producto.service';
import { UnidadService } from './services/unidad.service';
import { EntradaService } from './services/entrada.service';

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
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    AgGridModule,
    NgSelect2Module
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    ProductoService,
    UnidadService,
    EntradaService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
