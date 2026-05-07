import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VersenyReszletek } from './verseny-reszletek';

describe('VersenyReszletek', () => {
  let component: VersenyReszletek;
  let fixture: ComponentFixture<VersenyReszletek>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VersenyReszletek]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VersenyReszletek);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
