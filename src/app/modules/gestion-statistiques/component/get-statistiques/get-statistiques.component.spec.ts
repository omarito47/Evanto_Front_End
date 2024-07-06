import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetStatistiquesComponent } from './get-statistiques.component';

describe('GetStatistiquesComponent', () => {
  let component: GetStatistiquesComponent;
  let fixture: ComponentFixture<GetStatistiquesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetStatistiquesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetStatistiquesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
