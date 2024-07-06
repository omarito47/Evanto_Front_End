import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailEvaluationComponent } from './detail-evaluation.component';

describe('DetailEvaluationComponent', () => {
  let component: DetailEvaluationComponent;
  let fixture: ComponentFixture<DetailEvaluationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailEvaluationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
