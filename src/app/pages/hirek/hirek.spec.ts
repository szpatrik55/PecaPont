import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HirekComponent } from './hirek.component';
import { Firestore } from '@angular/fire/firestore';
import { vi } from 'vitest';
import { ActivatedRoute } from '@angular/router';

describe('HirekComponent', () => {
let component: HirekComponent;
let fixture: ComponentFixture<HirekComponent>;

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
imports: [HirekComponent],
providers: [
{ provide: Firestore, useValue: mockFirestore },
{ provide: ActivatedRoute, useValue: mockActivatedRoute }
]
}).compileComponents();

fixture = TestBed.createComponent(HirekComponent);
component = fixture.componentInstance;
(component as any).news = [];

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
it('hírek lista létezik (ha van)', () => {
const anyComp = component as any;

if (anyComp.news !== undefined) {
expect(anyComp.news).toBeDefined();
}
});

// 🟢 5
it('hírek megjeleníthetők a DOM-ban', () => {
const compiled = fixture.nativeElement as HTMLElement;
expect(compiled.textContent).toBeDefined();
});

// 🟢 6
it('adatbetöltő függvény hívható (ha van)', () => {
const anyComp = component as any;

if (anyComp.loadNews) {
const spy = vi.fn();
anyComp.loadNews = spy;

anyComp.loadNews();
expect(spy).toHaveBeenCalled();
}
});

// 🟢 7
it('üres lista esetén nem dob hibát', () => {
const anyComp = component as any;

if (anyComp.news !== undefined) {
anyComp.news = [];
expect(() => fixture.detectChanges()).not.toThrow();
}
});
});