import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SallesClientComponent } from './salles-client.component';

describe('SallesClientComponent', () => {
  let component: SallesClientComponent;
  let fixture: ComponentFixture<SallesClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SallesClientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SallesClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
