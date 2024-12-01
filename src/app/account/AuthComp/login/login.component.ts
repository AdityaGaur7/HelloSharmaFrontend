import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone:true,
  imports:[ReactiveFormsModule,CommonModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  invalidLogin: boolean = false; 
  
  constructor(
    private service: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.fb.group({});
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, this.emailOrPhoneValidator]], // Changed 'email' to 'username'
      password: ['', Validators.required]
    });
  }

  login(): void {
    console.log(this.loginForm.value);
    this.service.login(this.loginForm.value).subscribe(
      (response) => {
        console.log("Login response:", response);  // Log the full response for debugging
  
        if (response && response.jwt) {
          // Extract and store JWT token, username, email, and phone number
            const userData = {
            jwt: response.jwt,
            username: response.name,
            email: response.email,
            phone: response.phone,
            role:"user"
            };
        
            localStorage.setItem('HSLocalStorage', JSON.stringify(userData));
  
          // Navigate to the dashboard
          this.router.navigateByUrl('/');
        } else {
          this.invalidLogin = true;
          console.log("Invalid login credentials");
        }
      },
      (error) => {
        console.error("Error occurred during login:", error);
        this.invalidLogin = true;
      }
    );
  }
  
  
   
  emailOrPhoneValidator(control: FormControl): { [key: string]: boolean } | null {
    const value = control.value;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phonePattern = /^\d{10}$/;
  
    // Check if value matches email pattern or phone number pattern
    if (emailPattern.test(value) || phonePattern.test(value)) {
      return null; // Valid input
    } else {
      return { invalidusername: true }; // Invalid input
    }
  }
}
