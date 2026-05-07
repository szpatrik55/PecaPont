import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VersenySzerkeszto } from './verseny-szerkeszto';

describe('VersenySzerkeszto', () => {
  let component: VersenySzerkeszto;
  let fixture: ComponentFixture<VersenySzerkeszto>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VersenySzerkeszto]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VersenySzerkeszto);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
