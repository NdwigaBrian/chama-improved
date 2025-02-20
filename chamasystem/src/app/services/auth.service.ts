import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { login_details, token_details } from '../interfaces/interfaces';
import { environment } from '../../environments/environment'; // Import environment correctly

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  static isLoggedIn: any;
  isLoggedIn = false;
  private base_url = environment.base_url; // Assign base_url from environment

  constructor(private http: HttpClient) {
    AuthService.isLoggedIn = this.isLoggedIn;
  }

  loginUser(logins: login_details) {
    return this.http.post<{message?: string, token?: string, error?: string}>(
      `${this.base_url}/auth/login`, logins
    );
  }

  checkDetails(token: string) {
    return this.http.get<token_details>(`${this.base_url}/auth/check-details`, {
      headers: {
        'token': token
      }
    });
  }

  createAccount(user: { name: string, username: string, email: string, password: string }) {
    return this.http.post<{ message?: string, error?: string }>(
      `${this.base_url}/user/create`, user
    );
  }
}
