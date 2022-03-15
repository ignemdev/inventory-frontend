import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductoService } from 'src/app/services/producto.service';
import { UnidadService } from 'src/app/services/unidad.service';
import { Select2OptionData } from 'ng-select2';
import { map } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-producto-add',
  templateUrl: './producto-add.component.html',
  styleUrls: ['./producto-add.component.css']
})

export class ProductoAddComponent implements OnInit {
  addProductoForm: FormGroup;
  public unidadesList: Array<Select2OptionData>;
  public formControl = new FormControl();

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
    this.addProductoForm = this.fb.group({
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
  }

  resToSelect2List(res: any) {
    const { data } = res;
    const select2options = data.map((o: any) => {
      return { id: o.id, text: o.descripcion }
    });
    return select2options;
  }

  addProducto(): void {
    this.productoService.addProducto(this.addProductoForm.value).subscribe((data: any) => {
      if (data.hasError) {
        this.toastr.error(data.errorMessage, 'Operacion Fallida');
        return;
      }

      this.addProductoForm.reset();
      this.OnCloseModal.emit(true);
      this.toastr.success('Producto guardado.', 'Operacion Exitosa');
    });
  }

  checkInvalidInput(field: string): boolean | undefined {
    return this.addProductoForm.get(field)?.invalid &&
      (this.addProductoForm.get(field)?.dirty ||
        this.addProductoForm.get(field)?.touched)
  }
}
