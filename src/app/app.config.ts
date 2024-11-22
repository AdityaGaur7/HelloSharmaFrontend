import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { HttpClient, provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';


// Other module imports
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { provideToastr } from 'ngx-toastr';
import { provideStore, StoreModule } from '@ngrx/store';
import { rootReducer } from './store'; // Adjust path as necessary
import { routes } from './app.routes';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';

import { EffectsModule, provideEffects } from '@ngrx/effects';

export function createTranslateLoader(http: HttpClient): any {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideStore(rootReducer),
    provideEffects(),
    provideHttpClient(withInterceptorsFromDi()),
    provideHttpClient(withFetch()),
    importProvidersFrom(
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: createTranslateLoader,
          deps: [HttpClient]
        }
      }),
    ),
    provideAnimations(),
    provideToastr(),
    { provide: BsDropdownConfig, useValue: { isAnimated: true, autoClose: true } }
  ]

};
