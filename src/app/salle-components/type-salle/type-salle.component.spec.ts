import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeSalleComponent } from './type-salle.component';

describe('TypeSalleComponent', () => {
  let component: TypeSalleComponent;
  let fixture: ComponentFixture<TypeSalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeSalleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypeSalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
