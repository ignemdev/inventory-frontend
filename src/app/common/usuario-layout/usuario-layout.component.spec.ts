import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioLayoutComponent } from './usuario-layout.component';

describe('UsuarioLayoutComponent', () => {
  let component: UsuarioLayoutComponent;
  let fixture: ComponentFixture<UsuarioLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuarioLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
