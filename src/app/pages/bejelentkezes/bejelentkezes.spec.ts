import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BejelentkezesComponent } from './bejelentkezes.component';

describe('Bejelentkezes', () => {
  let component: BejelentkezesComponent;
  let fixture: ComponentFixture<BejelentkezesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BejelentkezesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BejelentkezesComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
