import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
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
import { EntradaAllComponent } from './components/entrada/entrada-all/entrada-all.component';
import { EntradaAddEditComponent } from './components/entrada/entrada-add-edit/entrada-add-edit.component';

import { AppComponent } from './app.component';

import { AgGridModule } from 'ag-grid-angular';
import { NgSelect2Module } from 'ng-select2';
import { ToastrModule } from 'ngx-toastr';

import { UnidadService } from './services/unidad.service';
import { RazonService } from './services/razon.service';
import { ProductoService } from './services/producto.service';
import { EntradaService } from './services/entrada.service';
import { SalidaService } from './services/salida.service';
import { SalidaAllComponent } from './components/salida/salida-all/salida-all.component';
import { SalidaAddComponent } from './components/salida/salida-add/salida-add.component';

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
    EntradaAllComponent,
    EntradaAddEditComponent,
    SalidaAllComponent,
    SalidaAddComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    AgGridModule,
    NgSelect2Module,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    UnidadService,
    ProductoService,
    EntradaService,
    SalidaService,
    RazonService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
