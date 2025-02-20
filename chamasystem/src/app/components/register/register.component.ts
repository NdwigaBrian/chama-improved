import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { new_user, user } from '../../interfaces/interfaces';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm: FormGroup; // Form group for registration form
  submitted = false; // Track if the form has been submitted
  errorMessage: string | null = null; // Store error message
  successMessage: string | null = null; // Store success message

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    // Initialize the form with validators
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]], // Username validation
      email: ['', [Validators.required, Validators.email]], // Email validation
      password: ['', [Validators.required, Validators.minLength(6)]], // Password validation
      confirmPassword: ['', [Validators.required]], // Confirm Password validation
    });
  }

  /**
   * Validate form inputs and send data to the backend
   */
  onSubmit() {
    this.submitted = true; // Mark form as submitted

    // Stop here if the form is invalid
    if (this.registerForm.invalid || !this.passwordsMatch()) {
      return;
    }

    // Extract form values
    const { username, email, password } = this.registerForm.value;

    // Send data to the backend API
    this.http
      .post('http://localhost:3000/api/register', { username, email, password })
      .subscribe({
        next: (response: any) => {
          console.log('Registration successful:', response);

          // Show success message
          this.successMessage = 'Registration successful! You can now log in.';
          this.errorMessage = null;

          // Redirect to login page
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);
        },
        error: (err) => {
          console.error('Registration failed:', err);

          // Show error message from backend
          this.errorMessage =
            err.error.message || 'An error occurred. Please try again.';
          this.successMessage = null;
        },
      });
  }

  /**
   * Helper method to check if passwords match
   */
  passwordsMatch(): boolean {
    const password = this.registerForm.get('password')?.value;
    const confirmPassword = this.registerForm.get('confirmPassword')?.value;
    return password === confirmPassword;
  }

  /**
   * Helper to access form controls in the template
   */
  get f() {
    return this.registerForm.controls;
  }
}
