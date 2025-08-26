import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

export const passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  if (password && confirmPassword && password.value !== confirmPassword.value) {
    return { passwordMismatch: true };
  }

  return null;
};

@Component({
  selector: 'app-reset-password',
  standalone: false,
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.scss'
})
export class ResetPassword implements OnInit {
  resetPasswordForm: FormGroup;
  isSubmitting = false;
  token: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.resetPasswordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
    }, { validators: passwordMatchValidator });
  }
  
  ngOnInit(): void {
    this.token = this.route.snapshot.paramMap.get('token');
  }

  resetPassword() {
    if (this.resetPasswordForm.invalid) {
      return;
    }

    this.isSubmitting = true;
    const { password } = this.resetPasswordForm.value;
    const passwordData = { password, token: this.token };

    this.authService.resetPassword(passwordData).subscribe({
      next: () => this.router.navigate(['/auth/login']),
      error: (err: any) => {
        console.error(err);
        this.isSubmitting = false;
      },
      complete: () => this.isSubmitting = false,
    });
  }
}
