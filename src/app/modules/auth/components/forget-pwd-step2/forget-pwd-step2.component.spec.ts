import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgetPwdStep2Component } from './forget-pwd-step2.component';

describe('ForgetPwdStep2Component', () => {
  let component: ForgetPwdStep2Component;
  let fixture: ComponentFixture<ForgetPwdStep2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgetPwdStep2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForgetPwdStep2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
