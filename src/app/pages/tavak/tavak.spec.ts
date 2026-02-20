import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tavak } from './tavak';

describe('Tavak', () => {
  let component: Tavak;
  let fixture: ComponentFixture<Tavak>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Tavak]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Tavak);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
