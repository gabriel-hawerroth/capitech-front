import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  Renderer2,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './main/components/footer/footer.component';
import { HeaderComponent } from './main/components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  template: `
    <div id="app">
      <app-header />
      <router-outlet />
      <app-footer />
    </div>
  `,
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  private readonly _renderer = inject(Renderer2);

  ngOnInit(): void {
    this._renderer.listen('window', 'DOMContentLoaded', () => {
      const headerElement = document.getElementById('header');
      if (headerElement) {
        const headerHeight = headerElement.offsetHeight;
        document.documentElement.style.setProperty(
          '--header-height',
          `${headerHeight}px`
        );
      }

      const footerElement = document.getElementById('footer');
      if (footerElement) {
        const footerHeight = footerElement.offsetHeight;
        document.documentElement.style.setProperty(
          '--footer-height',
          `${footerHeight}px`
        );
      }
    });
  }
}
