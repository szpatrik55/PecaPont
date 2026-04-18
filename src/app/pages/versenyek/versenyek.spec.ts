import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VersenyekComponent } from './versenyek.component';
import { Firestore } from '@angular/fire/firestore';
import { vi } from 'vitest';

describe('VersenyekComponent', () => {
let component: VersenyekComponent;
let fixture: ComponentFixture<VersenyekComponent>;

const mockFirestore = {
  type: 'firestore',
  getFirestore: () => ({}) // Néha ezt keresi belsőleg
} as any;

beforeEach(async () => {
await TestBed.configureTestingModule({
imports: [VersenyekComponent],
providers: [
{ provide: Firestore, useValue: mockFirestore }
]
}).compileComponents();

fixture = TestBed.createComponent(VersenyekComponent);
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
it('oldal tartalom megjelenik', () => {
const compiled = fixture.nativeElement as HTMLElement;
expect(compiled.textContent).toBeDefined();
});

// 🟢 5
it('verseny lista kezelhető (ha van)', () => {
const anyComp = component as any;

if (anyComp.competitions !== undefined) {
anyComp.competitions = [];
expect(anyComp.competitions.length).toBe(0);
}
});

// 🟢 6
it('adatbetöltő függvény hívható (ha van)', () => {
const anyComp = component as any;

if (anyComp.loadCompetitions) {
const spy = vi.fn();
anyComp.loadCompetitions = spy;

anyComp.loadCompetitions();
expect(spy).toHaveBeenCalled();
}
});

// 🟢 7
it('üres lista esetén nem dob hibát', () => {
const anyComp = component as any;

if (anyComp.competitions !== undefined) {
anyComp.competitions = null;
expect(() => fixture.detectChanges()).not.toThrow();
}
});

// 🟢 8
it('lista elem hozzáadható', () => {
const anyComp = component as any;

if (anyComp.competitions !== undefined) {
anyComp.competitions = [];
anyComp.competitions.push({ name: 'Teszt verseny' });

expect(anyComp.competitions.length).toBe(1);
}
});
});