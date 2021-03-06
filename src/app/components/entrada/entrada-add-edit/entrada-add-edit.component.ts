import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { EntradaService } from 'src/app/services/entrada.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-entrada-add-edit',
  templateUrl: './entrada-add-edit.component.html',
  styleUrls: ['./entrada-add-edit.component.css']
})

export class EntradaAddEditComponent implements OnInit {
  entradaAddEditForm: FormGroup;
  formDefaultValues: any = {
    id: [0],
    cantidad: ['', [Validators.required, Validators.min(1), Validators.max(10000)]],
  };
  producto: any = {};
  entrada: any = {};

  @Input() public set setProducto(_model: any) {
    if (_model != undefined) {
      this.producto = _model;
    }
  }

  @Input() public set setEntrada(_model: any) {
    if (_model != undefined) {
      this.entrada = _model;
      this.setFormData(this.entrada);
    }
  }

  @Output() public OnSubmit: EventEmitter<any> = new EventEmitter();

  constructor(
    public fb: FormBuilder,
    public entradaService: EntradaService,
    public toastr: ToastrService
  ) {
    this.entradaAddEditForm = this.fb.group(this.formDefaultValues);
  }

  ngOnInit(): void { }

  setFormData(data: any) {
    const { id, cantidad } = data;
    this.entradaAddEditForm.setValue({ id: id ?? 0, cantidad: cantidad ?? '' });
  }

  addEditEntrada() {
    const { id, cantidad } = this.entradaAddEditForm.value;
    if (id == 0) {
      this.addEntrada({ cantidad, productoId: this.producto.id })
      return;
    }
    this.editEntrada(this.entradaAddEditForm.value);
  }

  addEntrada(entrada: any) {
    this.entradaService.addEntrada(entrada)
      .subscribe((data: any) => {
        if (data.hasError) {
          this.toastr.error(data.errorMessage, 'Operacion Fallida');
          return;
        }

        this.entradaAddEditForm.setValue(this.formDefaultValues);
        this.OnSubmit.emit();
        this.toastr.success('Entrada agregada.', 'Operacion Exitosa');
      });
  }

  editEntrada(entrada: any) {
    this.entradaService.editEntrada(entrada)
      .subscribe((data: any) => {
        if (data.hasError) {
          this.toastr.error(data.errorMessage, 'Operacion Fallida');
          return;
        }

        this.entradaAddEditForm.setValue(this.formDefaultValues);
        this.OnSubmit.emit();
        this.toastr.success('Entrada editado.', 'Operacion Exitosa');

      });
  }

  checkInvalidInput(field: string): boolean | undefined {
    return this.entradaAddEditForm.get(field)?.invalid &&
      (this.entradaAddEditForm.get(field)?.dirty ||
        this.entradaAddEditForm.get(field)?.touched)
  }
}
