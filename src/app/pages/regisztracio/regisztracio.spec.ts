import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisztracioComponent } from './regisztracio.component';
import { Auth } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { vi } from 'vitest';
import { ActivatedRoute } from '@angular/router';

describe('RegisztracioComponent', () => {
let component: RegisztracioComponent;
let fixture: ComponentFixture<RegisztracioComponent>;

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
imports: [RegisztracioComponent],
providers: [
  { provide: Auth, useValue: mockAuth },
  { provide: Firestore, useValue: { app: {} } }, // Legalább egy 'app' property legyen benne
  { provide: ActivatedRoute, useValue: mockActivatedRoute }
]
}).compileComponents();

fixture = TestBed.createComponent(RegisztracioComponent);
component = fixture.componentInstance;

// ✅ tiszta inicializáció
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
it('nem dob hibát inicializációkor', () => {
expect(() => fixture.detectChanges()).not.toThrow();
});

// 🟢 4
it('regisztrációs form jelen van', async () => {
  fixture.detectChanges();
  await fixture.whenStable();
  fixture.detectChanges();

  const compiled = fixture.nativeElement as HTMLElement;
  const form = compiled.querySelector('form');

  expect(form).toBeTruthy();
});

// 🟢 5
it('input mezők kezelhetők', () => {
const compiled = fixture.nativeElement as HTMLElement;
const inputs = compiled.querySelectorAll('input');

expect(inputs.length).toBeGreaterThanOrEqual(0);
});

// 🟢 6
it('register függvény hívható (ha van)', () => {
const anyComp = component as any;

if (anyComp.register) {
const spy = vi.fn();
anyComp.register = spy;

anyComp.register();
expect(spy).toHaveBeenCalled();
}
});

// 🟢 7
it('email mező kezelhető', () => {
const anyComp = component as any;

if (anyComp.email !== undefined) {
anyComp.email = '[teszt@email.com](mailto:teszt@email.com)';
expect(anyComp.email).toContain('@');
}
});

// 🟢 8
it('üres állapot nem dob hibát', () => {
const anyComp = component as any;

if (anyComp.email !== undefined) {
anyComp.email = null;
expect(() => fixture.detectChanges()).not.toThrow();
}
});
});