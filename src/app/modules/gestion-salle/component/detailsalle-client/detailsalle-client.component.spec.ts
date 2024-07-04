import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsalleClientComponent } from './detailsalle-client.component';

describe('DetailsalleClientComponent', () => {
  let component: DetailsalleClientComponent;
  let fixture: ComponentFixture<DetailsalleClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsalleClientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsalleClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
