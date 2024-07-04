import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { ChooseDomaineComponent } from './components/choose-domaine/choose-domaine.component';
import { CreatAccountComponent } from './components/creat-account/creat-account.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { LoginGoogleComponent } from './components/login-google/login-google.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SelectAccountComponent } from './components/select-account/select-account.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { VerificationCodeComponent } from './components/verification-code/verification-code.component';
import { ForgetPwdStep1Component } from './components/forget-pwd-step1/forget-pwd-step1.component';
import { ForgetPwdStep2Component } from './components/forget-pwd-step2/forget-pwd-step2.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  // { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'verificationCode/:id', component: VerificationCodeComponent },
  {
    path:'forgetpwd_step1',
    component:ForgetPwdStep1Component
  },
  {
    path:'forgetpwd_step2/:id',
    component:ForgetPwdStep2Component
  }
 
  // { path: 'change-password', component: ChangePasswordComponent },
  // { path: 'choose-domaine', component: ChooseDomaineComponent },
  // { path: 'select-account', component: SelectAccountComponent },
  // { path: 'creat-account', component: CreatAccountComponent },
  // { path: 'login-with-google', component: LoginGoogleComponent },
  // { path: '**', component: NotFoundComponent },
  // { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [
    
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})

export class AuthRoutingModule { }