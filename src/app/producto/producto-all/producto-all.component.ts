import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable, map, Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';

import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-producto-all',
  templateUrl: './producto-all.component.html',
  styleUrls: ['./producto-all.component.css'],
})

export class ProductoAllComponent implements OnInit, AfterViewInit {

  productoList: any[] = [];

  @ViewChild(DataTableDirective, { static: false })
  datatableElement!: DataTableDirective;

  dtOptions: DataTables.Settings = {};
  dtLanguage: DataTables.LanguageSettings = {
    url: '//cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json'
  };
  dtColumnDefs: DataTables.ColumnDefsSettings[] = [
    { width: "10%", targets: '_all' }
  ]
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    private productoService: ProductoService
  ) { }

  ngOnInit(): void {
    this.dtOptions = {
      language: this.dtLanguage,
      columnDefs: this.dtColumnDefs,
      scrollX: true,
    }

    this.productoService.getProductoList()
      .subscribe((res: any) => {
        this.productoList = res.data;
        this.dtTrigger.next(0);
        this.setColumFiltering();
      });
  }

  ngAfterViewInit(): void { }

  setColumFiltering(): void {
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.columns().every(function () {
        const that = this;
        $('input', this.footer()).on('keyup change', function () {
          const input: string = (this as HTMLInputElement).value;
          if (that.search() !== input) {
            console.log(input);
            that.search(input).draw();
          }
        });
      });
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}
