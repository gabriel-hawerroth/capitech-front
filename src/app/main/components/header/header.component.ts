import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { HeaderActionBtnComponent } from './components/header-action-btn/header-action-btn.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [HeaderActionBtnComponent, MatButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {}
