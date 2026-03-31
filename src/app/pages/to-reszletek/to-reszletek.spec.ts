import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToReszletek } from './to-reszletek.component';

describe('ToReszletek', () => {
  let component: ToReszletek;
  let fixture: ComponentFixture<ToReszletek>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToReszletek]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToReszletek);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
