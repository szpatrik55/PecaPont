import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Rolunk } from './rolunk';

describe('Rolunk', () => {
  let component: Rolunk;
  let fixture: ComponentFixture<Rolunk>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Rolunk]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Rolunk);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
