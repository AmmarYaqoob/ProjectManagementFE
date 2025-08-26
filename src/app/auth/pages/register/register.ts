import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.html',
  styleUrls: ['./register.scss']
})
export class Register {
  registerForm: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  register() {
    if (this.registerForm.invalid) {
      return;
    }

    this.isSubmitting = true;
    const userData = this.registerForm.value;

    this.authService.register(userData).subscribe({
      next: () => this.router.navigate(['/auth/email-verification']),
      error: (err: any) => {
        console.error(err);
        this.isSubmitting = false;
      },
      complete: () => this.isSubmitting = false,
    });
  }
}
