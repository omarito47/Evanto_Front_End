import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtelierLieuComponent } from './atelier-lieu.component';

describe('AtelierLieuComponent', () => {
  let component: AtelierLieuComponent;
  let fixture: ComponentFixture<AtelierLieuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtelierLieuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtelierLieuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
