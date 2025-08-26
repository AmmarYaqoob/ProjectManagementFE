import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { ForgotPassword } from './pages/forgot-password/forgot-password';
import { EmailVerification } from './pages/email-verification/email-verification';
import { ResetPassword } from './pages/reset-password/reset-password';

export const AUTH_ROUTES: Routes = [
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'forgot-password', component: ForgotPassword },
  { path: 'email-verification', component: EmailVerification },
  { path: 'reset-password/:token', component: ResetPassword },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
]; 