import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { COUNTRIES } from '../../data/countries';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { SnackbarService } from '../../services/snackbar/snackbar.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  contries: String[] = COUNTRIES;

  form: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    firstname: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required]),
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
      this.submitted = true;
      if (this.form.valid) {
        this._auth.register(this.form.value).subscribe(
          {
            next: (data: any) => {
              localStorage.setItem('auth_token', data.token);
              this.router.navigate(['']);
            },
            error: (error) => {
              this._snackbar.openSnackBar(
                'Error al registrarse',
                'bg-danger',
                'text-white'
              );
            }
          }
        );
      }
    }
  }

}
