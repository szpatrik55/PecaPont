import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HirReszletek } from './hir-reszletek';

describe('HirReszletek', () => {
  let component: HirReszletek;
  let fixture: ComponentFixture<HirReszletek>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HirReszletek]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HirReszletek);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
