import { TestBed } from '@angular/core/testing';

import { IsDoneService } from './is-done.service';

describe('IsDoneService', () => {
  let service: IsDoneService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IsDoneService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
