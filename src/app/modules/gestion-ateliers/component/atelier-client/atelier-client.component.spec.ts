import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtelierClientComponent } from './atelier-client.component';

describe('AtelierClientComponent', () => {
  let component: AtelierClientComponent;
  let fixture: ComponentFixture<AtelierClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtelierClientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtelierClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
