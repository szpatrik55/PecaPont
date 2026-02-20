import { Routes } from '@angular/router';

import { Home } from './pages/home/home';
import { Tavak } from './pages/tavak/tavak';
import { Hirek } from './pages/hirek/hirek';
import { Versenyek } from './pages/versenyek/versenyek';
import { Galeria } from './pages/galeria/galeria';
import { Rolunk } from './pages/rolunk/rolunk';
import { Regisztracio } from './pages/regisztracio/regisztracio';
import { Bejelentkezes } from './pages/bejelentkezes/bejelentkezes';

export const routes: Routes = [
  { path: '', component: Home },

  { path: 'tavak', component: Tavak },
  { path: 'hirek', component: Hirek },
  { path: 'versenyek', component: Versenyek },
  { path: 'galeria', component: Galeria },
  { path: 'rolunk', component: Rolunk },
  { path: 'regisztracio', component: Regisztracio },
  { path: 'bejelentkezes', component: Bejelentkezes },

  { path: '**', redirectTo: '' },
];