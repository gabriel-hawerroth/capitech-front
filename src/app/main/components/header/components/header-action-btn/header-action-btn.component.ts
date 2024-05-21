import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-header-action-btn',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './header-action-btn.component.html',
  styleUrl: './header-action-btn.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderActionBtnComponent {
  icon = input.required<string>();
  topLabel = input.required<string>();
  bottomLabel = input.required<string>();
}
