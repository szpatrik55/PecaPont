import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VersenyekComponent } from './versenyek.component';

describe('Versenyek', () => {
  let component: VersenyekComponent;
  let fixture: ComponentFixture<VersenyekComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VersenyekComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VersenyekComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
