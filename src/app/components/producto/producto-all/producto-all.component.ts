import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ColDef, ColGroupDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { ToastrService } from 'ngx-toastr';

import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-producto-all',
  templateUrl: './producto-all.component.html',
  styleUrls: ['./producto-all.component.css'],
})

export class ProductoAllComponent implements OnInit {

  productos$!: Observable<any[]>;
  public showAddModal: boolean = false;
  public showEditModal: boolean = false;
  public showEntradasModal: boolean = false;
  public showSalidasModal: boolean = false;
  public isRowSelected: boolean = false;
  public selectedProducto: any = {};
  gridApi!: GridApi;

  columnDefs: (ColDef | ColGroupDef)[] = [
    { headerName: 'Id', field: 'id', sortable: true, filter: true, checkboxSelection: true },
    { headerName: 'Nombre', field: 'nombre', sortable: true, filter: true, },
    { headerName: 'Descripcion', field: 'descripcion', sortable: true, filter: true, },
    { headerName: 'Stock', field: 'stock', sortable: true, filter: true, },
    { headerName: 'Precio', field: 'precio', sortable: true, filter: true, },
    { headerName: 'Unidad', field: 'unidad.descripcion', sortable: true, filter: true, },
    { headerName: 'Creado', field: 'creado', sortable: true, filter: true },
    { headerName: 'Modificado', field: 'modificado', sortable: true, filter: true },
    { headerName: 'Creador', field: 'creador.username', sortable: true, filter: true },
    { headerName: 'Modificador', field: 'modificador.username', sortable: true, filter: true },
  ];

  gridOptions = {
    suppressMenuHide: true,
    suppressRowDeselection: true,
    suppressRowClickSelection: true,
    paginationPageSize: 10
  }

  constructor(
    private productoService: ProductoService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.productos$ = this.productoService.getProductoList()
      .pipe(map(this.getData))
  }

  getData(res: any) {
    return res.data
  }

  //abrir modal para agregar
  public addModalHandler() {
    this.showAddModal = true;
  }

  //abrir modal para editar
  public editModalHandler() {
    this.showEditModal = true;
  }

  //borrar producto
  deleteProducto() {
    this.productoService.deleteProducto(this.selectedProducto?.id)
      .subscribe((data: any) => {
        if (data.hasError) {
          this.toastr.success(data.errorMessage, 'Operacion Fallida');
        }

        this.refreshGrid();
        this.isRowSelected = false;
        this.toastr.success('Producto eliminado.', 'Operacion Exitosa');
      })
  }

  //abrir modal para ver entradas
  public entradasModalHandler() {
    this.showEntradasModal = true;
  }

  public salidasModalHandler() {
    this.showSalidasModal = true;
  }

  //cerrar modal para agregar
  closeAddModal() {
    this.refreshGrid();
    this.showAddModal = false;
  }

  //cerrar modal para editar
  closeEditModal() {
    this.refreshGrid();
    this.isRowSelected = false;
    this.showEditModal = false;
  }

  //cerrar modal de entradas
  closeEntradasModal() {
    this.refreshGrid();
    this.isRowSelected = false;
    this.showEntradasModal = false;
  }

  //cerrar modal de salidas
  closeSalidasModal() {
    this.refreshGrid();
    this.isRowSelected = false;
    this.showSalidasModal = false;
  }

  //evento disparado cuando se cambia el producto seleccionado
  onProductoSelectedChange() {
    const selectedRows = this.gridApi.getSelectedRows()[0];
    this.isRowSelected = selectedRows;
    this.selectedProducto = (this.isRowSelected) ? selectedRows : {};
  }

  //refrescar grid
  refreshGrid(): void {
    this.productos$.subscribe((data: any) => {
      this.gridApi.setRowData(data);
    });
  }

  //evento disparado cuando se carga el grid
  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }
}
