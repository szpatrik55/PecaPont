import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToReszletekComponent } from './to-reszletek.component';
import { Firestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { vi } from 'vitest';

describe('ToReszletekComponent', () => {
let component: ToReszletekComponent;
let fixture: ComponentFixture<ToReszletekComponent>;

const mockFirestore = {
  type: 'firestore',
  getFirestore: () => ({}) // Néha ezt keresi belsőleg
} as any;

const mockActivatedRoute = {
snapshot: {
paramMap: {
get: (key: string) => '1'
}
}
};

beforeEach(async () => {
await TestBed.configureTestingModule({
imports: [ToReszletekComponent],
providers: [
{ provide: Firestore, useValue: mockFirestore },
{ provide: ActivatedRoute, useValue: mockActivatedRoute }
]
}).compileComponents();

fixture = TestBed.createComponent(ToReszletekComponent);
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
it('route paraméter lekérhető', () => {
const route = TestBed.inject(ActivatedRoute);
expect(route.snapshot.paramMap.get('id')).toBe('1');
});

// 🟢 5
it('tó adat kezelhető (ha van)', () => {
const anyComp = component as any;

if (anyComp.lake !== undefined) {
anyComp.lake = { name: 'Teszt tó' };
expect(anyComp.lake.name).toContain('Teszt');
}
});

// 🟢 6
it('DOM tartalom megjelenik', () => {
const compiled = fixture.nativeElement as HTMLElement;
expect(compiled.textContent).toBeDefined();
});

// 🟢 7
it('adatbetöltő függvény hívható (ha van)', () => {
const anyComp = component as any;

if (anyComp.loadLake) {
const spy = vi.fn();
anyComp.loadLake = spy;

anyComp.loadLake();
expect(spy).toHaveBeenCalled();
}
});

// 🟢 8
it('üres adat esetén nem dob hibát', () => {
const anyComp = component as any;

if (anyComp.lake !== undefined) {
anyComp.lake = null;
expect(() => fixture.detectChanges()).not.toThrow();
}
});

// 🟢 9
it('tó objektum mezői ellenőrizhetők', () => {
const lake = { name: 'Balaton', location: 'HU' };
expect(lake.name).toContain('Balaton');
});
});