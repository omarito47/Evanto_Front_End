import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeClientSalleComponent } from './type-client-salle.component';

describe('TypeClientSalleComponent', () => {
  let component: TypeClientSalleComponent;
  let fixture: ComponentFixture<TypeClientSalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeClientSalleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypeClientSalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
