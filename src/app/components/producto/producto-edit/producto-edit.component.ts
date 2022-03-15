import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductoService } from 'src/app/services/producto.service';
import { UnidadService } from 'src/app/services/unidad.service';
import { Select2OptionData } from 'ng-select2';
import { map } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-producto-edit',
  templateUrl: './producto-edit.component.html',
  styleUrls: ['./producto-edit.component.css']
})
export class ProductoEditComponent implements OnInit {
  editProductoForm: FormGroup;
  public unidadesList: Array<Select2OptionData>;
  public formControl = new FormControl();
  public producto: any;

  // Get data From Parent ----------------------------------
  @Input() public set setProducto(_model: any) {
    if (_model != undefined) {
      this.producto = _model;
    }
  }

  // Close Modal ----------------------------------
  @Output() public OnCloseModal: EventEmitter<any> = new EventEmitter();

  onCancel() {
    this.OnCloseModal.emit(true);
  }

  constructor(
    public fb: FormBuilder,
    public productoService: ProductoService,
    public unidadService: UnidadService,
    public toastr: ToastrService
  ) {
    this.editProductoForm = this.fb.group({
      id: ['', [Validators.required]],
      nombre: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(150)]],
      descripcion: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(300)]],
      precio: ['', [Validators.required, Validators.min(10), Validators.max(100000)]],
      unidadId: ['', [Validators.required]]
    });
    this.unidadesList = [];
  }

  ngOnInit(): void {
    this.unidadService.getUnidadList()
      .pipe(map(this.resToSelect2List))
      .subscribe((data: any) => this.unidadesList = data);

    const { creado, modificado, creador, modificador, unidad, stock, ...producto } = this.producto;
    this.editProductoForm.setValue({ ...producto, unidadId: unidad.id });
  }

  resToSelect2List(res: any) {
    const { data } = res;
    const select2options = data.map((o: any) => {
      return { id: o.id, text: o.descripcion }
    });
    return select2options;
  }

  editProducto(): void {
    this.productoService.editProducto(this.editProductoForm.value).subscribe((data: any) => {
      if (data.hasError) {
        this.toastr.error(data.errorMessage, 'Operacion Fallida');
        return;
      }

      this.editProductoForm.reset();
      this.OnCloseModal.emit(true);
      this.toastr.success('Producto editado.', 'Operacion Exitosa');
    });
  }

  checkInvalidInput(field: string): boolean | undefined {
    return this.editProductoForm.get(field)?.invalid &&
      (this.editProductoForm.get(field)?.dirty ||
        this.editProductoForm.get(field)?.touched)
  }
}
