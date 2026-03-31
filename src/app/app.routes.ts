import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { ToListaComponent } from './pages/tavak/tavak.component';
import { ToReszletekComponent } from './pages/to-reszletek/to-reszletek.component';
import { HirekComponent } from './pages/hirek/hirek.component';
import { VersenyekComponent } from './pages/versenyek/versenyek.component';
import { GalleryComponent } from './pages/galeria/galeria.component';
import { GalleryUploadComponent } from './pages/galeria/gallery-upload.component';
import { RolunkComponent } from './pages/rolunk/rolunk.component';
import { RegisztracioComponent } from './pages/regisztracio/regisztracio.component';
import { BejelentkezesComponent } from './pages/bejelentkezes/bejelentkezes.component';
import { AdminComponent } from './pages/admin/admin.component';
import { ProfilComponent } from './pages/profil/profil.component';
import { authGuard } from './guards/auth-guard';
import { adminGuard } from './guards/admin-guard';

export const routes: Routes = [
  { path: '', component: HomeComponent }, // Főoldal útvonala

  { path: 'tavak', component: ToListaComponent }, // TóLista oldal útvonala
  { path: 'tavak/:id', component: ToReszletekComponent}, // TóRészletek oldal útvonala

  { path: 'hirek', component: HirekComponent }, // Hírek oldal útvonala

  { path: 'versenyek', component: VersenyekComponent }, // Versenyek oldal útvonala

  { path: 'galeria', component: GalleryComponent }, // Galéria oldal útvonala
  { path: 'kepfeltoltes', component: GalleryUploadComponent}, // Kép feltöltés oldal útvonala

  { path: 'rolunk', component: RolunkComponent }, // Rólunk oldal útvonala

  { path: 'regisztracio', component: RegisztracioComponent }, // Regisztrációs oldal útvonala
  { path: 'bejelentkezes', component: BejelentkezesComponent }, // Bejelentkezés oldal útvonala
  { path: 'profil', component: ProfilComponent, canActivate: [authGuard] }, // Profil oldal útvonala, csak bejelentkezve

  { path: 'admin', component: AdminComponent, canActivate: [adminGuard] }, // Admin felület útvonala, csak adminként bejelentkezve

  { path: '**', redirectTo: '' }, // Üres/Hiba visszavezet a főoldalra
];