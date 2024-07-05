import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyReclamationDetailsComponent } from './my-reclamation-details.component';

describe('MyReclamationDetailsComponent', () => {
  let component: MyReclamationDetailsComponent;
  let fixture: ComponentFixture<MyReclamationDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyReclamationDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyReclamationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
