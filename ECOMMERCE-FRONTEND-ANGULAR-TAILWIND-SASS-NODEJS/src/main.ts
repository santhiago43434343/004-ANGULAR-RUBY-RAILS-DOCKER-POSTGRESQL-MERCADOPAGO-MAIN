import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from '@app/app.component';
import { appConfig } from '@app/app.component.config';
import { CookieService } from '@services/cookie.service';
import { provideHttpClient, withFetch } from '@angular/common/http';

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    ...(appConfig.providers ?? []),
    CookieService,
    // O withFetch() é essencial para aplicações modernas e SSR
    provideHttpClient(withFetch()) 
  ]
}).catch(err => console.error(err));