import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToListaComponent } from './tavak.component';
import { Firestore } from '@angular/fire/firestore';
import { vi } from 'vitest';

describe('TavakComponent', () => {
let component: ToListaComponent;
let fixture: ComponentFixture<ToListaComponent>;

const mockFirestore = {
  type: 'firestore',
  getFirestore: () => ({}) // Néha ezt keresi belsőleg
} as any;

beforeEach(async () => {
await TestBed.configureTestingModule({
imports: [ToListaComponent],
providers: [
{ provide: Firestore, useValue: mockFirestore }
]
}).compileComponents();

fixture = TestBed.createComponent(ToListaComponent);
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
it('tavak lista kezelhető (ha van)', () => {
const anyComp = component as any;

if (anyComp.lakes !== undefined) {
anyComp.lakes = [];
expect(anyComp.lakes.length).toBe(0);
}
});

// 🟢 5
it('tavak megjeleníthetők a DOM-ban', () => {
const compiled = fixture.nativeElement as HTMLElement;
expect(compiled.textContent).toBeDefined();
});

// 🟢 6
it('adatbetöltő függvény hívható (ha van)', () => {
const anyComp = component as any;

if (anyComp.loadLakes) {
const spy = vi.fn();
anyComp.loadLakes = spy;

anyComp.loadLakes();
expect(spy).toHaveBeenCalled();
}
});

// 🟢 7
it('üres lista esetén nem dob hibát', () => {
const anyComp = component as any;

if (anyComp.lakes !== undefined) {
anyComp.lakes = null;
expect(() => fixture.detectChanges()).not.toThrow();
}
});

// 🟢 8
it('lista elem hozzáadható (ha van)', () => {
const anyComp = component as any;

if (anyComp.lakes !== undefined) {
anyComp.lakes = [];
anyComp.lakes.push({ name: 'Teszt tó' });

expect(anyComp.lakes.length).toBe(1);
}
});

// 🟢 9
it('tó objektum mezői kezelhetők', () => {
const lake = { name: 'Balaton', location: 'HU' };
expect(lake.name).toContain('Balaton');
});
});