import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ColDef, ColGroupDef, GridApi, GridReadyEvent } from 'ag-grid-community';

import { ProductoService } from 'src/app/services/producto.service';

import { BtnEditComponent } from 'src/app/buttons/btn-edit.component';
import { BtnDeleteComponent } from 'src/app/buttons/btn-delete.component';
import { ProductoAddComponent } from '../producto-add/producto-add.component';

@Component({
  selector: 'app-producto-all',
  templateUrl: './producto-all.component.html',
  styleUrls: ['./producto-all.component.css'],
})

export class ProductoAllComponent implements OnInit {

  productos$!: Observable<any[]>;
  public showAddModal: boolean = false;

  columnDefs: (ColDef | ColGroupDef)[] = [
    { headerName: 'Id', field: 'id', sortable: true, filter: true, },
    { headerName: 'Nombre', field: 'nombre', sortable: true, filter: true, },
    { headerName: 'Descripcion', field: 'descripcion', sortable: true, filter: true, },
    { headerName: 'Stock', field: 'stock', sortable: true, filter: true, },
    { headerName: 'Precio', field: 'precio', sortable: true, filter: true, },
    { headerName: 'Unidad', field: 'unidad.descripcion', sortable: true, filter: true, },
    { headerName: 'Stock', field: 'stock', sortable: true, filter: true, },
    { headerName: 'Creado', field: 'creado', sortable: true, filter: true },
    { headerName: 'Modificado', field: 'modificado', sortable: true, filter: true },
    { headerName: 'Creador', field: 'creador.username', sortable: true, filter: true },
    { headerName: 'Modificador', field: 'modificador.username', sortable: true, filter: true },

    {
      headerName: 'Operaciones',
      children: [
        {
          headerName: 'Editar',
          field: "id",
          cellRenderer: BtnEditComponent,
          cellRendererParams: {
            clicked: this.editProducto
          },
          width: 100,
        },
        {
          headerName: 'Eliminar',
          field: "id",
          cellRenderer: BtnDeleteComponent,
          cellRendererParams: {
            clicked: this.deleteProducto
          },
          width: 120,
        }
      ]
    }

  ];

  gridOptions = {
    suppressMenuHide: true,
  }

  constructor(
    private productoService: ProductoService
  ) { }

  gridApi!: GridApi;

  ngOnInit(): void {
    this.productos$ = this.productoService.getProductoList()
      .pipe(map(this.getData))
  }

  getData(res: any) {
    if (res.hasError) {
      console.log(res) //mostrar error
    }

    return res.data
  }

  editProducto(id: any) {
    alert(`editar ${id}`);
  }

  deleteProducto(id: any) {
    alert(`borrar ${id}`);
  }

  refreshGrid(): void {
    this.productos$.subscribe((data: any) => {
      this.gridApi.setRowData(data);
    });
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }

  //abrir modal para agregar
  public addModalHandler() {
    this.showAddModal = true;
  }

  closeModal() {
    this.showAddModal = false;
  }
}
