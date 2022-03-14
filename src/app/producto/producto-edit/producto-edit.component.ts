import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ProductoService } from 'src/app/services/producto.service';
import { UnidadService } from 'src/app/services/unidad.service';
import { Select2OptionData } from 'ng-select2';
import { map } from 'rxjs';

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
      console.log('desde modal:' + _model);
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
    public unidadService: UnidadService
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

    //llenar form
  }

  resToSelect2List(res: any) {
    const { data } = res;
    const select2options = data.map((o: any) => {
      return { id: o.id, text: o.descripcion }
    });
    return select2options;
  }

  editProducto(): void {
    this.productoService.editProducto(this.editProductoForm.value).subscribe((res: any) => {
      if (res.hasError) {
        console.log(res); //mostrar mensaje
      }

      this.editProductoForm.reset();
      this.OnCloseModal.emit(true);
      console.log(res);
    });
  }
}
