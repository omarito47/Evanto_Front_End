import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFormClientComponent } from './user-form-client.component';

describe('UserFormClientComponent', () => {
  let component: UserFormClientComponent;
  let fixture: ComponentFixture<UserFormClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserFormClientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserFormClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
