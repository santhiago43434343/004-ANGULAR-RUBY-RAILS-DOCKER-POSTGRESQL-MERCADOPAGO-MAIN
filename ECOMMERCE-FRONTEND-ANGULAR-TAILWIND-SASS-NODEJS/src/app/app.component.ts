import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '@footer/footer.component';
import { MatToolbar } from '@angular/material/toolbar';
import { HeaderComponent } from './header/header.component';
import { CookieBannerComponent } from './cookie-banner/cookie-banner.component'
import { CookiePanelComponent } from './cookie-panel/cookie-panel.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgIf,CookiePanelComponent ,CookieBannerComponent,HeaderComponent, FooterComponent, MatToolbar, ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  protected readonly title = signal('ecommerce');

mostrarPainel = false;

abrirPainelCookies() {
  this.mostrarPainel = true;
}
fecharPainelCookies() {
  this.mostrarPainel = false;
  
    }

 }
