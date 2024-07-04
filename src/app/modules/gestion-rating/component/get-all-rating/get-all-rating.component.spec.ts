import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAllRatingComponent } from './get-all-rating.component';

describe('GetAllRatingComponent', () => {
  let component: GetAllRatingComponent;
  let fixture: ComponentFixture<GetAllRatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetAllRatingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetAllRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
