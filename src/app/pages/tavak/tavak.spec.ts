import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToLista } from './tavak.component';

describe('Tavak', () => {
  let component: ToLista;
  let fixture: ComponentFixture<ToLista>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToLista]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToLista);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
