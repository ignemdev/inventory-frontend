import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ColDef, ColGroupDef, GridApi, GridReadyEvent } from 'ag-grid-community';

import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-salida-all',
  templateUrl: './salida-all.component.html',
  styleUrls: ['./salida-all.component.css']
})
export class SalidaAllComponent implements OnInit {
  public producto: any = {};
  public selectedSalida: any = {};
  salidas$!: Observable<any[]>;
  gridApi!: GridApi;

  columnDefs: (ColDef | ColGroupDef)[] = [
    { headerName: 'Id', field: 'id', sortable: true, filter: true },
    { headerName: 'Producto', field: 'producto.nombre', sortable: true, filter: true, },
    { headerName: 'Cantidad', field: 'cantidad', sortable: true, filter: true, },
    { headerName: 'Razon', field: 'razon.descripcion', sortable: true, filter: true, },
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
    private productoService: ProductoService
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
    this.salidas$ = this.productoService.getProductoSalidasById(this.producto.id)
      .pipe(map(this.getData))
  }

  getData(res: any) {
    if (res.hasError) {
      console.log(res) //mostrar error
    }

    return res.data
  }

  onSalidaAddSubmit() {
    this.refreshGrid();
  }

  refreshGrid(): void {
    this.salidas$.subscribe((data: any) => {
      this.gridApi.setRowData(data);
    });
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }
}
