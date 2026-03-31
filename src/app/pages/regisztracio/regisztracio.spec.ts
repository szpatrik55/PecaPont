import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisztracioComponent } from './regisztracio.component';

describe('Regisztracio', () => {
  let component: RegisztracioComponent;
  let fixture: ComponentFixture<RegisztracioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisztracioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisztracioComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
