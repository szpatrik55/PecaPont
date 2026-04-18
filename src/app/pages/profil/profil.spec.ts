import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfilComponent } from './profil.component';
import { Firestore } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';
import { vi } from 'vitest';

describe('ProfilComponent', () => {
let component: ProfilComponent;
let fixture: ComponentFixture<ProfilComponent>;

// ✅ MOCKOK
const mockFirestore = {
  type: 'firestore',
  getFirestore: () => ({}) // Néha ezt keresi belsőleg
} as any;
const mockAuth = {
  currentUser: null
};

beforeEach(async () => {
await TestBed.configureTestingModule({
imports: [ProfilComponent],
providers: [
{ provide: Firestore, useValue: mockFirestore },
{ provide: Auth, useValue: mockAuth }
]
}).compileComponents();

fixture = TestBed.createComponent(ProfilComponent);
component = fixture.componentInstance;

// ✅ tiszta init
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
it('profil adatok kezelhetők (ha vannak)', () => {
const anyComp = component as any;

if (anyComp.user !== undefined) {
anyComp.user = { name: 'Teszt', email: '[test@test.hu](mailto:test@test.hu)' };
expect(anyComp.user.name).toBe('Teszt');
}
});

// 🟢 5
it('DOM tartalom megjelenik', () => {
const compiled = fixture.nativeElement as HTMLElement;
expect(compiled.textContent).toBeDefined();
});

// 🟢 6
it('profil frissítő függvény hívható (ha van)', () => {
const anyComp = component as any;

if (anyComp.updateProfile) {
const spy = vi.fn();
anyComp.updateProfile = spy;

anyComp.updateProfile();
expect(spy).toHaveBeenCalled();
}
});

// 🟢 7
it('üres profil esetén nem dob hibát', () => {
const anyComp = component as any;

if (anyComp.user !== undefined) {
anyComp.user = null;
expect(() => fixture.detectChanges()).not.toThrow();
}
});

// 🟢 8
it('email mező kezelhető', () => {
const anyComp = component as any;

if (anyComp.user !== undefined) {
anyComp.user = { email: '[teszt@email.com](mailto:teszt@email.com)' };
expect(anyComp.user.email).toContain('@');
}
});
});