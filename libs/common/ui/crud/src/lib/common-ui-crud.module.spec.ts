import { async, TestBed } from '@angular/core/testing';
import { CommonUiCrudModule } from './common-ui-crud.module';

describe('CommonUiCrudModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CommonUiCrudModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(CommonUiCrudModule).toBeDefined();
  });
});
