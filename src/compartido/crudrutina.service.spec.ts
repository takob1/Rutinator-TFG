import { TestBed } from '@angular/core/testing';

import { CrudrutinaService } from './crudrutina.service';

describe('CrudrutinaService', () => {
  let service: CrudrutinaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrudrutinaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
