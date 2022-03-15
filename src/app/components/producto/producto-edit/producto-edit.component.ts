import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
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
  public productoId: any;

  // Get data From Parent ----------------------------------
  @Input() public set setProductoId(_model: any) {
    if (_model != undefined) {
      this.productoId = _model;
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
      id: [''],
      nombre: [''],
      descripcion: [''],
      precio: [''],
      unidadId: ['']
    });
    this.unidadesList = [];
  }

  ngOnInit(): void {
    this.unidadService.getUnidadList()
      .pipe(map(this.resToSelect2List))
      .subscribe((data: any) => this.unidadesList = data);

    this.setFormData(this.productoId);
  }

  resToSelect2List(res: any) {
    const { data } = res;
    const select2options = data.map((o: any) => {
      return { id: o.id, text: o.descripcion }
    });
    return select2options;
  }

  setFormData(id: any): void {
    this.productoService.getProductoById(id)
      .pipe(map((res: any) => res.data))
      .subscribe((data: any) => {
        const { creado, modificado, creador, modificador, unidad, stock, ...producto } = data;
        this.editProductoForm.setValue({ ...producto, unidadId: unidad.id });
      });
  }

  editProducto(): void {
    this.productoService.editProducto(this.editProductoForm.value).subscribe((data: any) => {
      console.log(data);
      if (data.hasError) {
        this.toastr.error(data.errorMessage, 'Operacion Fallida');
        return;
      }

      this.editProductoForm.reset();
      this.OnCloseModal.emit(true);
      this.toastr.success('Producto editado.', 'Operacion Exitosa');
    });
  }
}
