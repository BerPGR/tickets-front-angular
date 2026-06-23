import { Component, inject } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider'
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth',
  imports: [CardModule, DividerModule, ButtonModule, ReactiveFormsModule, InputTextModule, FloatLabelModule],
  templateUrl: './auth.html',
  styleUrl: './auth.css',
})
export class Auth {
  authForm: FormGroup
  router = inject(Router)
  authService = inject(AuthService)

  constructor() {
    this.authForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    })
  }

  login() {
    this.authForm.markAllAsTouched()
    this.authService.login(this.authForm.value.email, this.authForm.value.password).subscribe({
      next: (_) => {
        this.router.navigate(['/'])
      }
    })
  }
}
