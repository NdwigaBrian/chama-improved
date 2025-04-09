import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms'; // Import FormsModule


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule], // Add FormsModule here
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginError: boolean = false;
  loginSuccess: boolean = false;
  error: string = '';
  username: any;
  password: any;

  constructor(private router: Router, private authService: AuthService) {}

  login() {
    const details = {
      username: this.username,
      password: this.password
    };

    this.authService.loginUser (details).subscribe(res => {
      if (res.token) {
        // Handle successful login
        this.authService.isLoggedIn = true;
        localStorage.setItem('user_id', res.info.id);
        this.router.navigate(['dashboard']);
      } else if (res.error) {
        this.loginError = true;
        this.error = res.error;
        setTimeout(() => {
          this.error = '';
          this.loginError = false;
        }, 3000);
      }
    },
    err => {
      console.error(err);//log the error for debugging
    }
  );
  }
}