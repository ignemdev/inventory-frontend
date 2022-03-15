import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ColDef, ColGroupDef, GridApi, GridReadyEvent } from 'ag-grid-community';

import { ProductoService } from 'src/app/services/producto.service';
import { EntradaService } from 'src/app/services/entrada.service';

@Component({
  selector: 'app-entrada-all',
  templateUrl: './entrada-all.component.html',
  styleUrls: ['./entrada-all.component.css']
})
export class EntradaAllComponent implements OnInit {
  public producto: any = {};
  public selectedEntrada: any = {};
  public isRowSelected: boolean = false;
  entradas$!: Observable<any[]>;
  gridApi!: GridApi;

  columnDefs: (ColDef | ColGroupDef)[] = [
    { headerName: 'Id', field: 'id', sortable: true, filter: true, checkboxSelection: true },
    { headerName: 'Producto', field: 'producto.nombre', sortable: true, filter: true, },
    { headerName: 'Cantidad', field: 'cantidad', sortable: true, filter: true, },
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
    private entradaService: EntradaService
  ) { }

  @Input() public set setProducto(_model: any) {
    if (_model != undefined) {
      this.producto = _model;
    }
  }

  @Output() public OnCloseModal: EventEmitter<any> = new EventEmitter();
  onCancel() {
    this.OnCloseModal.emit(true);
  }

  ngOnInit(): void {
    this.entradas$ = this.productoService.getProductoEntradasById(this.producto.id)
      .pipe(map(this.getData))
  }

  getData(res: any) {
    if (res.hasError) {
      console.log(res) //mostrar error
    }

    return res.data
  }

  deleteEntrada() {
    this.entradaService.deleteEntrada(this.selectedEntrada?.id)
      .subscribe((data: any) => {
        if (data.hasError) {
          console.log(data); //mostrar mensaje
        }

        this.isRowSelected = false;
        this.selectedEntrada = {};
        this.refreshGrid();
      })
  }

  onEntradaAddEditSubmit() {
    this.isRowSelected = false;
    this.selectedEntrada = {};
    this.refreshGrid();
  }

  //evento disparado cuando se cambia el producto seleccionado
  onEntradaSelectedChange() {
    const selectedRows = this.gridApi.getSelectedRows()[0];
    this.isRowSelected = selectedRows;
    this.selectedEntrada = (this.isRowSelected) ? selectedRows : {};
  }

  refreshGrid(): void {
    this.entradas$.subscribe((data: any) => {
      this.gridApi.setRowData(data);
    });
    console.log('refresco')
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }
}
