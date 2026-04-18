import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app';
import { Auth } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { vi } from 'vitest';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';


describe('AppComponent', () => {

// ✅ mockok
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
imports: [AppComponent],
providers: [
{ provide: Auth, useValue: mockAuth },
{ provide: Firestore, useValue: mockFirestore },
{ provide: ActivatedRoute, useValue: mockActivatedRoute }
]
}).compileComponents();
});

// 🟢 1
it('létrejön az app', () => {
const fixture = TestBed.createComponent(AppComponent);
const app = fixture.componentInstance;
expect(app).toBeTruthy();
});

// 🟢 2
it('template render működik', () => {
  const fixture = TestBed.createComponent(AppComponent);
  const component = fixture.componentInstance;

  // 🔥 kötelező ha async pipe van
  (component as any).user$ = of(null);
  (component as any).isAdmin$ = of(false);

  fixture.detectChanges();

  const compiled = fixture.nativeElement as HTMLElement;
  expect(compiled.textContent).toBeDefined();
});
});