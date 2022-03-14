import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ProductoService } from 'src/app/services/producto.service';
import { UnidadService } from 'src/app/services/unidad.service';
import { Select2OptionData } from 'ng-select2';

@Component({
  selector: 'app-producto-add',
  templateUrl: './producto-add.component.html',
  styleUrls: ['./producto-add.component.css']
})

export class ProductoAddComponent implements OnInit {
  addProductoForm: FormGroup;
  public exampleData: Array<Select2OptionData>;
  public formControl = new FormControl();
  public value!: string;

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
  ) {
    this.addProductoForm = this.fb.group({
      nombre: [''],
      descripcion: [''],
      precio: [''],
    });

    this.exampleData = [
      {
        id: 'basic1',
        text: 'Basic 1'
      },
      {
        id: 'basic2',
        disabled: true,
        text: 'Basic 2'
      },
      {
        id: 'basic3',
        text: 'Basic 3'
      },
      {
        id: 'basic4',
        text: 'Basic 4'
      }
    ];
  }

  ngOnInit(): void {

  }

  addProducto(): void {

  }

}
