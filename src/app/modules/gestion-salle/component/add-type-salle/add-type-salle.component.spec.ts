import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTypeSalleComponent } from './add-type-salle.component';

describe('AddTypeSalleComponent', () => {
  let component: AddTypeSalleComponent;
  let fixture: ComponentFixture<AddTypeSalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTypeSalleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTypeSalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
