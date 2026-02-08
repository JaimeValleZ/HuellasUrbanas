import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerCampanasComponent } from './ver-campanas.component';

describe('VerCampanasComponent', () => {
  let component: VerCampanasComponent;
  let fixture: ComponentFixture<VerCampanasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VerCampanasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VerCampanasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
