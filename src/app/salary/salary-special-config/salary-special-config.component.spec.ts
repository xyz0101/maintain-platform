import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalarySpecialConfigComponent } from './salary-special-config.component';

describe('SalarySpecialConfigComponent', () => {
  let component: SalarySpecialConfigComponent;
  let fixture: ComponentFixture<SalarySpecialConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalarySpecialConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalarySpecialConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
