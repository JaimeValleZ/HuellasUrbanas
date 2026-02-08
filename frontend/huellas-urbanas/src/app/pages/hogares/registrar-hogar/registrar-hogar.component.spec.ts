import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarHogarComponent } from './registrar-hogar.component';

describe('RegistrarHogarComponent', () => {
  let component: RegistrarHogarComponent;
  let fixture: ComponentFixture<RegistrarHogarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegistrarHogarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegistrarHogarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
