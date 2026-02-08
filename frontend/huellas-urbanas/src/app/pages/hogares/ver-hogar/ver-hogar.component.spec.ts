import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerHogarComponent } from './ver-hogar.component';

describe('VerHogarComponent', () => {
  let component: VerHogarComponent;
  let fixture: ComponentFixture<VerHogarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VerHogarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VerHogarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
