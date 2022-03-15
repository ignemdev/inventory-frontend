import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validator, Validators } from '@angular/forms';
import { Select2OptionData } from 'ng-select2';
import { map } from 'rxjs';

import { SalidaService } from 'src/app/services/salida.service';
import { RazonService } from 'src/app/services/razon.service';
import { ToastrService } from 'ngx-toastr';

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
    private razonService: RazonService,
    private toastr: ToastrService
  ) {
    this.salidaAddForm = this.fb.group({
      cantidad: ['', [Validators.required, Validators.min(1), Validators.max(10000)]],
      razonId: ['', [Validators.required]]
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
          this.toastr.error(data.errorMessage, 'Operacion Fallida');
          return;
        }

        this.salidaAddForm.reset();
        this.OnSubmit.emit(true);
        this.toastr.success('Salida agregada.', 'Operacion Exitosa');
      });
  }

  checkInvalidInput(field: string): boolean | undefined {
    return this.salidaAddForm.get(field)?.invalid &&
      (this.salidaAddForm.get(field)?.dirty ||
        this.salidaAddForm.get(field)?.touched)
  }
}
