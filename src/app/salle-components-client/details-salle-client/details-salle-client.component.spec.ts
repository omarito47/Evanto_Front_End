import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsSalleClientComponent } from './details-salle-client.component';

describe('DetailsSalleClientComponent', () => {
  let component: DetailsSalleClientComponent;
  let fixture: ComponentFixture<DetailsSalleClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsSalleClientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsSalleClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
