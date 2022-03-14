import { Component, OnDestroy, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-btn-delete',
  template: `
    <button class="btn btn-outline-danger btn-sm" (click)="btnClickedHandler()">Eliminar</button>
  `,
})
export class BtnDeleteComponent implements ICellRendererAngularComp, OnDestroy {
  private params: any;

  agInit(params: any): void {
    this.params = params;
  }

  btnClickedHandler() {
    this.params.clicked(this.params.value);
  }

  refresh(params: ICellRendererParams) { return true }

  ngOnDestroy() { }
}
