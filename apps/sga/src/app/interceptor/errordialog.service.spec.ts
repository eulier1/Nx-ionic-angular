import { TestBed } from '@angular/core/testing';

import { ErrordialogService } from './errordialog.service';

describe('ErrordialogService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ErrordialogService = TestBed.get(ErrordialogService);
    expect(service).toBeTruthy();
  });
});
