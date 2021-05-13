import { TestBed } from '@angular/core/testing';

import { CRUDejercicioService } from './crudejercicio.service';

describe('CRUDejercicioService', () => {
  let service: CRUDejercicioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CRUDejercicioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
