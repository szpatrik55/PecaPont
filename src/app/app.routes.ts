import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { ToListaComponent } from './pages/tavak/tavak.component';
import { ToReszletekComponent } from './pages/to-reszletek/to-reszletek.component';
import { HirekComponent } from './pages/hirek/hirek.component';
import { VersenyekComponent } from './pages/versenyek/versenyek.component';
import { GalleryComponent } from './pages/fogasok/galeria.component';
import { GalleryUploadComponent } from './pages/fogasok/gallery-upload.component';
import { RolunkComponent } from './pages/rolunk/rolunk.component';
import { RegisztracioComponent } from './pages/regisztracio/regisztracio.component';
import { BejelentkezesComponent } from './pages/bejelentkezes/bejelentkezes.component';
import { ProfilComponent } from './pages/profil/profil.component';
import { authGuard } from './guards/auth-guard';
import { adminGuard } from './guards/admin-guard';
import { NewsEditorComponent } from './pages/hirek-szerkeszto/hirek-szerkeszto.component';
import { HirReszletekComponent } from './pages/hir-reszletek/hir-reszletek.component';
import { ToHozzaadComponent } from './pages/to-hozzaad/to-hozzaad.component';


export const routes: Routes = [
  { path: '', component: HomeComponent },

  { path: 'tavak', component: ToListaComponent },
  { path: 'tavak/:id', component: ToReszletekComponent },

  { path: 'hirek', component: HirekComponent },
  { path: 'hirek/:id', component: HirReszletekComponent },

  { path: 'hirek-szerkeszto', component: NewsEditorComponent, canActivate: [authGuard] },

  { path: 'versenyek', component: VersenyekComponent },

  { path: 'galeria', component: GalleryComponent },
  { path: 'kepfeltoltes', component: GalleryUploadComponent, canActivate: [authGuard] },

  { path: 'rolunk', component: RolunkComponent },

  { path: 'regisztracio', component: RegisztracioComponent },
  { path: 'bejelentkezes', component: BejelentkezesComponent },

  { path: 'profil', component: ProfilComponent, canActivate: [authGuard] },

  {
  path: 'admin',
  canActivate: [adminGuard],
  loadComponent: () =>
    import('./pages/admin/admin-layout/admin-layout.component')
      .then(m => m.AdminLayoutComponent),
  children: [
    {
      path: '',
      loadComponent: () =>
        import('./pages/admin/admin-dashboard/admin-dashboard.component')
          .then(m => m.AdminDashboardComponent)
    },
    {
      path: 'users',
      loadComponent: () =>
        import('./pages/admin/admin-users/admin-users.component')
          .then(m => m.AdminUsersComponent)
    },
    {
      path: 'to-hozzaad',
      loadComponent: () =>
        import('./pages/to-hozzaad/to-hozzaad.component')
          .then(m => m.ToHozzaadComponent)
    }
  ]
},

  { path: '**', redirectTo: '/', pathMatch: 'full' }
];