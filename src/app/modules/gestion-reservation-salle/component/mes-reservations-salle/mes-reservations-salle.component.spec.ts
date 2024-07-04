import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesReservationsSalleComponent } from './mes-reservations-salle.component';

describe('MesReservationsSalleComponent', () => {
  let component: MesReservationsSalleComponent;
  let fixture: ComponentFixture<MesReservationsSalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MesReservationsSalleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MesReservationsSalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
