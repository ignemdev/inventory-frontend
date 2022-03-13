import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoAllComponent } from './producto-all.component';

describe('ProductoAllComponent', () => {
  let component: ProductoAllComponent;
  let fixture: ComponentFixture<ProductoAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductoAllComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductoAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
