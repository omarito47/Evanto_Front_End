import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingSalleClientComponent } from './rating-salle-client.component';

describe('RatingSalleClientComponent', () => {
  let component: RatingSalleClientComponent;
  let fixture: ComponentFixture<RatingSalleClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RatingSalleClientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RatingSalleClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
