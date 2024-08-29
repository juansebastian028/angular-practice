import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SnackbarService } from '../../services/snackbar/snackbar.service';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports:  [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  form: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  submitted = false;

  
  constructor(
    private _auth: AuthService,
    private router: Router,
    private _snackbar: SnackbarService,
  ) {}

  onFormSubmit() {
    this.submitted = true;
    if (this.form.valid) {
      this._auth.login(this.form.value).subscribe(
        {
          next: (data: any) => {
            localStorage.setItem('auth_token', data.token);
            this.router.navigate(['']);
          },
          error: (error) => {
            this._snackbar.openSnackBar(
              'Usuario o contraseña incorrectas',
              'bg-danger',
              'text-white'
            );
          }
        }
      );
    }
  }

}
