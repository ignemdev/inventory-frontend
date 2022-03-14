import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ColDef, ColGroupDef, GridApi, GridReadyEvent } from 'ag-grid-community';

import { ProductoService } from 'src/app/services/producto.service';

import { BtnEditComponent } from 'src/app/buttons/btn-edit.component';
import { BtnDeleteComponent } from 'src/app/buttons/btn-delete.component';

@Component({
  selector: 'app-producto-all',
  templateUrl: './producto-all.component.html',
  styleUrls: ['./producto-all.component.css'],
})

export class ProductoAllComponent implements OnInit {

  productos$!: Observable<any[]>;
  public showAddModal: boolean = false;
  public showEditModal: boolean = false;
  public selectedProductoId: any;

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
            clicked: this.editModalHandler
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

  //abrir modal para agregar
  public addModalHandler() {
    this.showAddModal = true;
  }

  //abrir modal para editar
  public editModalHandler(id: any) {
    this.showEditModal = true;
    this.selectedProductoId = id;
    console.log(`editar ${id}`);
    console.log(`editar ${this.showEditModal}`);
  }

  //borrar producto
  deleteProducto(id: any) {
    alert(`borrar ${id}`);
  }

  //cerrar modal para agregar
  closeAddModal() {
    this.refreshGrid();
    this.showAddModal = false;
  }

  //cerrar modal para editar
  closeEditModal() {
    this.refreshGrid();
    this.showEditModal = false;
  }

  refreshGrid(): void {
    this.productos$.subscribe((data: any) => {
      this.gridApi.setRowData(data);
    });
    console.log('refresco')
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }
}
