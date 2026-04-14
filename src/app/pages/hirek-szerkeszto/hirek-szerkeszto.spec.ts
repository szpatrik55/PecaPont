import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsEditorComponent } from './hirek-szerkeszto.component';
import { NEVER } from 'rxjs';

describe('HirekSzerkeszto', () => {
  let component: NewsEditorComponent;
  let fixture: ComponentFixture<NewsEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewsEditorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewsEditorComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
