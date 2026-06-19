import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider'
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-auth',
  imports: [CardModule, DividerModule, ButtonModule, ReactiveFormsModule, InputTextModule, FloatLabelModule],
  templateUrl: './auth.html',
  styleUrl: './auth.css',
})
export class Auth {
  authForm: FormGroup

  constructor() {
    this.authForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    })
  }

  login() {
    this.authForm.markAllAsTouched()
    console.log(this.authForm.value)
  }
}
