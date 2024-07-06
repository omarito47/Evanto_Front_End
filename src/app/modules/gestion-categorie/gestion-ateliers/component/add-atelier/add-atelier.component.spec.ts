import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAtelierComponent } from './add-atelier.component';

describe('AddAtelierComponent', () => {
  let component: AddAtelierComponent;
  let fixture: ComponentFixture<AddAtelierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAtelierComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAtelierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
