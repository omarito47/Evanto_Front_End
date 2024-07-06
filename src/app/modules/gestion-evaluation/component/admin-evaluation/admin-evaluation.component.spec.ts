import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEvaluationComponent } from './admin-evaluation.component';

describe('AdminEvaluationComponent', () => {
  let component: AdminEvaluationComponent;
  let fixture: ComponentFixture<AdminEvaluationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminEvaluationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
