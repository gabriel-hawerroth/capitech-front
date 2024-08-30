import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { passowordRegex } from '../../../../utils/utils';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    RouterModule,
    MatDividerModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPage {
  private readonly _fb = inject(FormBuilder);
  private readonly _authService = inject(AuthService);

  loginForm = this._fb.group({
    email: ['gabriel@gmail.com', [Validators.required, Validators.email]],
    password: [
      'Mengo@2019',
      [Validators.required, Validators.pattern(passowordRegex)],
    ],
    rememberMe: [true],
  });

  loading = signal(false);

  login() {
    if (this.loginForm.invalid) {
      return;
    }

    const data = this.loginForm.getRawValue();

    this.loading.set(true);

    this._authService
      .login(data.email!, data.password!)
      .then(() => {
        // Do something
      })
      .finally(() => this.loading.set(false));
  }
}
