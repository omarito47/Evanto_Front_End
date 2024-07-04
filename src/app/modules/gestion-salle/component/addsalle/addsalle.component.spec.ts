import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddsalleComponent } from './addsalle.component';

describe('AddsalleComponent', () => {
  let component: AddsalleComponent;
  let fixture: ComponentFixture<AddsalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddsalleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddsalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
