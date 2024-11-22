import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm!: FormGroup;  // Do not initialize here
  errorMessage: string | undefined;
  registrationSuccess: boolean = false;

  constructor(private service: AuthService, private fb: FormBuilder) {}

  ngOnInit() {
    // Initialize the form in ngOnInit
    this.signupForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(100)]],
      phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      confirmPassword: ['', Validators.required],
    }, { validator: this.passwordMatchValidator });
  }

  private passwordMatchValidator(fg: FormGroup) {
    const password = fg.get('password')?.value;
    const confirmPassword = fg.get('confirmPassword')?.value;
    if (password !== confirmPassword) {
      fg.get("confirmPassword")?.setErrors({ passwordMismatch: true });
    } else {
      fg.get('confirmPassword')?.setErrors(null);
    }
  }

  signup() {
    if (this.signupForm.invalid) {
      Object.keys(this.signupForm.controls).forEach(controlName => {
        const control = this.signupForm.get(controlName);
        if (control?.invalid && control?.touched) {
          control.setValue('');
        }
      });
      return;
    }

    this.service.checkUser(this.signupForm.value).subscribe((response: string) => {
      if (response === 'Email is already registered!') {
        this.errorMessage = 'User with this email already exists. Please use a different email.';
      } else if (response === 'Phone number is already registered!') {
        this.errorMessage = 'User with this phone number already exists. Please use a different phone number.';
      } else if (response === 'User registered successfully!') {
        this.registrationSuccess = true;
      }
    });
  }

  getErrorMessage(controlName: string): string[] {
    const control = this.signupForm.get(controlName);
    const errorMessages: string[] = [];

    if (control?.errors) {
      Object.keys(control.errors).forEach(error => {
        switch (error) {
          case 'required':
            errorMessages.push('This field is required');
            break;
          case 'maxlength':
            errorMessages.push(`Maximum length exceeded (${control.errors?.['maxlength']?.requiredLength} characters required)`);
            break;
          case 'minlength':
            errorMessages.push(`Minimum length not met (${control.errors?.['minlength']?.requiredLength} characters required)`);
            break;
          case 'email':
            errorMessages.push('Invalid email format');
            break;
          case 'passwordMismatch':
            errorMessages.push('Passwords do not match');
            break;
          default:
            break;
        }
      });
    }

    return errorMessages;
  }
}
