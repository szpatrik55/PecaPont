import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToListaComponent } from './tavak.component';

describe('Tavak', () => {
  let component: ToListaComponent;
  let fixture: ComponentFixture<ToListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToListaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToListaComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
