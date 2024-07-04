import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReclamationMonthlyStatsComponent } from './reclamation-monthly-stats.component';

describe('ReclamationMonthlyStatsComponent', () => {
  let component: ReclamationMonthlyStatsComponent;
  let fixture: ComponentFixture<ReclamationMonthlyStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReclamationMonthlyStatsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReclamationMonthlyStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
