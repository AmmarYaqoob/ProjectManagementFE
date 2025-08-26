import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { ForgotPassword } from './pages/forgot-password/forgot-password';
import { EmailVerification } from './pages/email-verification/email-verification';
import { ResetPassword } from './pages/reset-password/reset-password';


@NgModule({
  declarations: [
    Login,
    Register,
    ForgotPassword,
    EmailVerification,
    ResetPassword
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthRoutingModule
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }