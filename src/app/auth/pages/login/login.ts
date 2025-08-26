import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrls: ['./login.scss'] 
})
export class Login {
  loginForm: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  login() {
    this.router.navigate([''])
    // if (this.loginForm.invalid) {
    //   return;
    // }

    // this.isSubmitting = true;
    // const credentials = this.loginForm.value;

    // this.authService.login(credentials).subscribe({
    //   next: () => this.router.navigate(['/app']),
    //   error: (err: any) => {
    //     console.error(err);
    //     this.isSubmitting = false;
    //   },
    //   complete: () => this.isSubmitting = false,
    // });
  }
}
