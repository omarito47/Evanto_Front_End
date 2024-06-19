import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { VerificationCodeComponent } from './verification-code/verification-code.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ForgetPwdStep1Component } from './forget-pwd-step1/forget-pwd-step1.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path:'signup',
    component:SignUpComponent
  },
  {
    path:'signin',
    component:SignInComponent
  },
  {
    path:'verificationCode/:id',
    component:VerificationCodeComponent
  },
  {
    path:'homePage',
    component:HomePageComponent
  },
  {
    path:'forgetpwd_step1',
    component:ForgetPwdStep1Component
  },
  {
    path:'profile',
    component:ProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
