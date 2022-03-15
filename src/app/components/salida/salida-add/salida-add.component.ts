import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Select2OptionData } from 'ng-select2';
import { map } from 'rxjs';

import { SalidaService } from 'src/app/services/salida.service';
import { RazonService } from 'src/app/services/razon.service';

@Component({
  selector: 'app-salida-add',
  templateUrl: './salida-add.component.html',
  styleUrls: ['./salida-add.component.css']
})
export class SalidaAddComponent implements OnInit {
  salidaAddForm: FormGroup;
  producto: any = {};
  public razonList: Array<Select2OptionData>;

  @Input() public set setProducto(_model: any) {
    if (_model != undefined) {
      this.producto = _model;
    }
  }

  @Output() public OnSubmit: EventEmitter<any> = new EventEmitter();

  constructor(
    public fb: FormBuilder,
    private salidaService: SalidaService,
    private razonService: RazonService
  ) {
    this.salidaAddForm = this.fb.group({
      cantidad: [''],
      razonId: ['']
    });

    this.razonList = [];
  }

  ngOnInit(): void {
    this.razonService.getRazonList()
      .pipe(map(this.resToSelect2List))
      .subscribe((data: any) => this.razonList = data);
  }

  resToSelect2List(res: any) {
    const { data } = res;
    const select2options = data.map((o: any) => {
      return { id: o.id, text: o.descripcion }
    });
    return select2options;
  }

  addSalida() {
    this.salidaService.addSalida({ ...this.salidaAddForm.value, productoId: this.producto.id })
      .subscribe((data: any) => {
        if (data.hasError) {
          console.log(data); //mostrar mensaje
        }

        this.salidaAddForm.reset();
        this.OnSubmit.emit(true);
        console.log(data);
      });
  }
}
