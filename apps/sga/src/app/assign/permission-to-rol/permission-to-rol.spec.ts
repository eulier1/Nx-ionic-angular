import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RolToUserComponent } from './permission-to-rol.component';

describe('RolToUserComponent', () => {
  let component: RolToUserComponent;
  let fixture: ComponentFixture<RolToUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RolToUserComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RolToUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
