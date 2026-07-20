import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessusListe } from './processus-liste';

describe('ProcessusListe', () => {
  let component: ProcessusListe;
  let fixture: ComponentFixture<ProcessusListe>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcessusListe],
    }).compileComponents();

    fixture = TestBed.createComponent(ProcessusListe);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
