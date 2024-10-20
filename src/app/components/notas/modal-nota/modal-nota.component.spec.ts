import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalNotaComponent } from './modal-nota.component';

describe('ModalNotaComponent', () => {
  let component: ModalNotaComponent;
  let fixture: ComponentFixture<ModalNotaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalNotaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalNotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
