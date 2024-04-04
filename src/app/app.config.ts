import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { UserReducer } from './store/user/user.reducer';
import { provideEffects } from '@ngrx/effects';
import { UserEffects } from './store/user/user.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(),
    provideStore({ users: UserReducer }),
    provideEffects(UserEffects),
  ],
};
