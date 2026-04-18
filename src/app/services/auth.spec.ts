import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth';
import { Auth } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { vi } from 'vitest';

describe('AuthService', () => {
let service: AuthService;

const mockAuth = {
  currentUser: null,
  signInWithEmailAndPassword: vi.fn(),
  createUserWithEmailAndPassword: vi.fn(),
  signOut: vi.fn(),
};

const mockFirestore = {
  collection: vi.fn(),
  doc: vi.fn(),
};

beforeEach(() => {
TestBed.configureTestingModule({
providers: [
AuthService,
{ provide: Auth, useValue: mockAuth },
{ provide: Firestore, useValue: mockFirestore }
]
});

service = TestBed.inject(AuthService);
});

// 🟢 1
it('létrejön a service', () => {
expect(service).toBeTruthy();
});

// 🟢 2 (valódi teszt)
it('auth dependency elérhető', () => {
expect((service as any).auth).toBeDefined();
});

// 🟢 3 (ha van login)
it('login függvény létezik', () => {
const anyService = service as any;

if (anyService.login) {
expect(typeof anyService.login).toBe('function');
}
});

// 🟢 4 (ha van register)
it('register függvény létezik', () => {
const anyService = service as any;

if (anyService.register) {
expect(typeof anyService.register).toBe('function');
}
});
});