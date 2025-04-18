import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
  signUpForm: FormGroup;
  hidePassword = true;
  hideConfirmPassword = true;
private tost=inject(ToastrService)
  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.signUpForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
        type: ['', Validators.required],
      },
      { validator: this.passwordsMatchValidator }
    );
  }

  passwordsMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordsMismatch: true };
  }

  onSignUp(): void {
    if (this.signUpForm.valid) {
      const userData = {
        userName: this.signUpForm.get('email')?.value.split('@')[0], 
        emailAddress: this.signUpForm.get('email')?.value,
        password: this.signUpForm.get('password')?.value,
        appName: this.signUpForm.get('type')?.value,
      };

      this.authService.register(userData).subscribe({
        next: (response) => {
          console.log('Registration successful:', response);
          // alert('Registration successful!');
          this.tost.success('Registration successful!');

        },
        error: (error) => {
          console.error('Registration failed:', error);
          this.tost.error('Registration failed. Please try again.');
        },
      });

      this.signUpForm.reset();
    } else {
      this.signUpForm.markAllAsTouched();
    }
  }
}