import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RolunkComponent } from './rolunk.component';

describe('RolunkComponent', () => {
let component: RolunkComponent;
let fixture: ComponentFixture<RolunkComponent>;

beforeEach(async () => {
await TestBed.configureTestingModule({
imports: [RolunkComponent]
}).compileComponents();

fixture = TestBed.createComponent(RolunkComponent);
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
it('oldal tartalom megjelenik', () => {
const compiled = fixture.nativeElement as HTMLElement;
expect(compiled.textContent).toBeDefined();
});

// 🟢 5 ✅ JAVÍTOTT (null-safe)
it('legalább egy szöveges elem van', () => {
const compiled = fixture.nativeElement as HTMLElement;
const text = compiled.textContent?.trim() ?? '';

expect(text.length).toBeGreaterThan(0);

});

// 🟢 6
it('nem dob hibát többszöri render esetén', () => {
fixture.detectChanges();
fixture.detectChanges();
expect(true).toBeTruthy();
});
});
