import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../config/config.service';
import { Login } from '../../interfaces/login';
import { Register } from '../../interfaces/register';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  path: string = '';
  currentUserProfile: any;
  currentUser: any;
  token: any;

  constructor(private http: HttpClient, private config: ConfigService) {
    this.path = this.config.path;
    this.initCurrentUser();
  }

  initCurrentUser() {
    this.token = localStorage.getItem('auth_token');
  }

  login(login: Login) {
    return this.http.post(`${this.path}/auth/login`, login);
  }

  register(register: Register) {
    return this.http.post(`${this.path}/auth/register`, register);
  }

  logout(): void {
    localStorage.removeItem('auth_token');
  }

  isAuthenticated(): boolean {
    this.initCurrentUser();
    return this.getToken() !== null ? true : false;
  }

  getToken() {
    return this.token;
  }
}