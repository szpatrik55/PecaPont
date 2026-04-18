import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { Auth } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { vi } from 'vitest';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { provideRouter } from '@angular/router';

describe('NavbarComponent', () => {
let component: NavbarComponent;
let fixture: ComponentFixture<NavbarComponent>;

// ✅ MOCKOK
const mockAuth = {
currentUser: null
};

const mockFirestore = {
  type: 'firestore',
  getFirestore: () => ({}) // Néha ezt keresi belsőleg
} as any;

const mockActivatedRoute = {
  snapshot: {
    paramMap: {
      get: (key: string) => null
    }
  }
};

beforeEach(async () => {
await TestBed.configureTestingModule({
imports: [NavbarComponent],
providers: [
{ provide: Auth, useValue: mockAuth },
{ provide: Firestore, useValue: mockFirestore },
{ provide: ActivatedRoute, useValue: mockActivatedRoute },
{ provide: Auth, useValue: mockAuth },
  provideRouter([]) // 🔥 EZ IS KELL
]
}).compileComponents();

fixture = TestBed.createComponent(NavbarComponent);
component = fixture.componentInstance;

(component as any).user$ = of(null);
(component as any).isAdmin$ = of(false);
(component as any).isEditor$ = of(false);

fixture.detectChanges();
});

// 🟢 1
it('létrejön a komponens', () => {
expect(component).toBeTruthy();
});

// 🟢 2
it('template betöltődik', () => {
const compiled = fixture.nativeElement as HTMLElement;
expect(compiled).toBeTruthy();
});

// 🟢 3
it('nem dob hibát renderkor', () => {
expect(() => fixture.detectChanges()).not.toThrow();
});
});