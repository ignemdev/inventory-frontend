import { Component, OnDestroy, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-btn-edit',
  template: `
    <button class="btn btn-outline-dark btn-sm" (click)="btnClickedHandler()">Editar</button>
  `,
})
export class BtnEditComponent implements ICellRendererAngularComp, OnDestroy {
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
