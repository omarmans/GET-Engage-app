import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.scss',
})
export class LogInComponent {
  loginForm!: FormGroup;
  hidePassword: boolean = false;

  constructor(private fb: FormBuilder , private auth :AuthService, private router:Router, private toast:ToastrService) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      const userData = {
        userNameOrEmailAddress: this.loginForm.get('email')?.value.split('@')[0], 
        password: this.loginForm.get('password')?.value,
      };

      this.auth.login(userData).subscribe({
        next: (response) => {
          if(response.result==1){
            console.log('login successful:', response);
            // alert('login successful!');
            this.toast.success('login successful!')
            this.router.navigate(['/dashboard']);
          }         
          if(response.result==2){
            console.log('Username or password is incorrect :', response);
            // alert('Username or password is incorrect!');
            this.toast.error('Username or password is incorrect!');
          }         
        },
        error: (error) => {
          console.log('login failed:', error);
          // alert('login failed!');
          this.toast.error('login failed!');
        },
      })

    }
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }
}
