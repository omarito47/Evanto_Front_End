import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgetPwdStep1Component } from './forget-pwd-step1.component';

describe('ForgetPwdStep1Component', () => {
  let component: ForgetPwdStep1Component;
  let fixture: ComponentFixture<ForgetPwdStep1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgetPwdStep1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForgetPwdStep1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
