import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Hirek } from './hirek';

describe('Hirek', () => {
  let component: Hirek;
  let fixture: ComponentFixture<Hirek>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Hirek]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Hirek);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
