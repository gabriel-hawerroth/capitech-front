import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { HeaderActionBtnComponent } from './components/header-action-btn/header-action-btn.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    HeaderActionBtnComponent,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  public auth = inject(AuthService);

  readonly searchInput = new FormControl('');
}
