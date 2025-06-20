import {
  ApplicationConfig,
  provideZoneChangeDetection
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import {
  provideClientHydration,
  withEventReplay
} from '@angular/platform-browser';
import {
  provideHttpClient,
  withInterceptors
} from '@angular/common/http';
import { tokenInterceptor } from './auth/interceptors/token.interceptor';
import {
  provideCharts,
  withDefaultRegisterables
} from 'ng2-charts';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withInterceptors([tokenInterceptor])),
    provideCharts(withDefaultRegisterables())
  ]
};
