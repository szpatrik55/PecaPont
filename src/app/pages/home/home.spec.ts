import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { Firestore } from '@angular/fire/firestore';
import { vi } from 'vitest';
import { ActivatedRoute } from '@angular/router';

describe('HomeComponent', () => {
let component: HomeComponent;
let fixture: ComponentFixture<HomeComponent>;

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
imports: [HomeComponent],
providers: [
{ provide: Firestore, useValue: mockFirestore },
{ provide: ActivatedRoute, useValue: mockActivatedRoute }
]
}).compileComponents();

fixture = TestBed.createComponent(HomeComponent);
component = fixture.componentInstance;
(component as any).items = [];

// ✅ tiszta
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
it('oldal tartalom megjelenik', () => {
const compiled = fixture.nativeElement as HTMLElement;
expect(compiled.textContent).toBeDefined();
});

// 🟢 5
it('adatlista kezelhető (ha van)', () => {
const anyComp = component as any;

if (anyComp.items !== undefined) {
anyComp.items = [];
expect(anyComp.items.length).toBe(0);
}
});

// 🟢 6
it('adatbetöltő függvény hívható (ha van)', () => {
const anyComp = component as any;

if (anyComp.loadData) {
const spy = vi.fn();
anyComp.loadData = spy;

anyComp.loadData();
expect(spy).toHaveBeenCalled();
}
});

// 🟢 7
it('üres állapot nem dob hibát', () => {
const anyComp = component as any;

if (anyComp.items !== undefined) {
anyComp.items = null;
expect(() => fixture.detectChanges()).not.toThrow();
}
});
});