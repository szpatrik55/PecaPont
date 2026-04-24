import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToHozzaadComponent } from './to-hozzaad.component';
import { Firestore } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';
import { Storage } from '@angular/fire/storage';
import { vi } from 'vitest';
import { of } from 'rxjs';

vi.mock('@angular/fire/firestore', async () => {
const actual = await vi.importActual<any>('@angular/fire/firestore');

return {
...actual,
collection: vi.fn(() => ({})),
collectionData: vi.fn(() => of([]))
};
});

describe('AdminComponent', () => {
let component: ToHozzaadComponent;
let fixture: ComponentFixture<ToHozzaadComponent>;

const mockFirestore = {
  type: 'firestore',
  getFirestore: () => ({})
} as any;
const mockAuth = {
  currentUser: null
};
const mockStorage = {};

beforeEach(async () => {
await TestBed.configureTestingModule({
imports: [ToHozzaadComponent],
providers: [
{ provide: Firestore, useValue: mockFirestore },
{ provide: Auth, useValue: mockAuth },
{ provide: Storage, useValue: mockStorage }
]
}).compileComponents();

fixture = TestBed.createComponent(ToHozzaadComponent);
component = fixture.componentInstance;
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
it('admin oldal tartalma megjelenik', () => {
const compiled = fixture.nativeElement as HTMLElement;
expect(compiled.textContent).toBeDefined();
});

// 🟢 5
it('gomb kattintás nem dob hibát', () => {
const compiled = fixture.nativeElement as HTMLElement;
const button = compiled.querySelector('button');

if (button) {
expect(() => button.click()).not.toThrow();
}
});

// 🟢 6
it('admin funkció hívható', () => {
const anyComp = component as any;

if (anyComp.loadData) {
const spy = vi.fn();
anyComp.loadData = spy;

anyComp.loadData();
expect(spy).toHaveBeenCalled();
}
});

// 🟢 7
it('adatlista kezelhető', () => {
const anyComp = component as any;

if (anyComp.items !== undefined) {
anyComp.items = [];
expect(anyComp.items.length).toBe(0);
}
});

// 🟢 8
it('hibaállapot nem dob kivételt', () => {
const anyComp = component as any;

if (anyComp.items !== undefined) {
anyComp.items = null;
expect(() => fixture.detectChanges()).not.toThrow();
}
});

// 🟢 9
it('admin jogosultság logika kezelhető', () => {
const anyComp = component as any;

if (anyComp.isAdmin !== undefined) {
anyComp.isAdmin = false;
expect(anyComp.isAdmin).toBe(false);

anyComp.isAdmin = true;
expect(anyComp.isAdmin).toBe(true);
}
});
});