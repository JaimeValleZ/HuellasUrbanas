import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarHogaresComponent } from './listar-hogares.component';

describe('ListarHogaresComponent', () => {
  let component: ListarHogaresComponent;
  let fixture: ComponentFixture<ListarHogaresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListarHogaresComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListarHogaresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
