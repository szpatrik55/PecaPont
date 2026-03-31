import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToReszletekComponent } from './to-reszletek.component';

describe('ToReszletek', () => {
  let component: ToReszletekComponent;
  let fixture: ComponentFixture<ToReszletekComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToReszletekComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToReszletekComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
