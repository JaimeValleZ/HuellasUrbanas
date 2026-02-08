import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportarPerroComponent } from './reportar-perro.component';

describe('ReportarPerroComponent', () => {
  let component: ReportarPerroComponent;
  let fixture: ComponentFixture<ReportarPerroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReportarPerroComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReportarPerroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
