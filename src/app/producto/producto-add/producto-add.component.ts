import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ProductoService } from 'src/app/services/producto.service';
import { UnidadService } from 'src/app/services/unidad.service';
import { Select2OptionData } from 'ng-select2';
import { map } from 'rxjs';

@Component({
  selector: 'app-producto-add',
  templateUrl: './producto-add.component.html',
  styleUrls: ['./producto-add.component.css']
})

export class ProductoAddComponent implements OnInit {
  addProductoForm: FormGroup;
  public unidadesList: Array<Select2OptionData>;
  public formControl = new FormControl();
  public unidadId!: string;

  // Get data From Parent ----------------------------------
  @Input() public set getModelId(_model: any) {
    if (_model != undefined) {
      //get data ...........
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
    this.addProductoForm = this.fb.group({
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
  }

  resToSelect2List(res: any) {
    const { data } = res;
    const select2options = data.map((o: any) => {
      return { id: o.id, text: o.descripcion }
    });
    return select2options;
  }

  addProducto(): void {
    this.productoService.addProducto(this.addProductoForm.value).subscribe((res: any) => {
      if (res.hasError) {
        console.log(res); //mostrar mensaje
      }

      this.addProductoForm.reset();
      this.OnCloseModal.emit(true);
      console.log(res);
    });
  }

  // public valueChanged(event: string | string[]) {
  //   // console.log(this.addProductoForm.value);
  // }

  // public modelChanged(event: string) {
  //   // console.log(this.addProductoForm.value);
  // }

}
