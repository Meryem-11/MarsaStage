import { TestBed } from '@angular/core/testing';

import { ProgrammeAudit } from './programme-audit';

describe('ProgrammeAudit', () => {
  let service: ProgrammeAudit;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProgrammeAudit);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
