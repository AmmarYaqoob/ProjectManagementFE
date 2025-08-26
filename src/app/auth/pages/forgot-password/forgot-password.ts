import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  standalone: false,
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.scss'
})
export class ForgotPassword {
  forgotPasswordForm: FormGroup;
  isSubmitting = false;
  isLinkSent = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  sendResetLink() {
    if (this.forgotPasswordForm.invalid) {
      return;
    }
    
    this.isSubmitting = true;
    const { email } = this.forgotPasswordForm.value;

    this.authService.sendPasswordResetLink(email).subscribe({
      next: () => {
        this.isLinkSent = true;
      },
      error: (err: any) => {
        console.error(err);
      },
      complete: () => {
        this.isSubmitting = false;
      }
    });
  }
}
