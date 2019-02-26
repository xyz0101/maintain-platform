import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaryHolidayConfigComponent } from './salary-holiday-config.component';

describe('SalaryHolidayConfigComponent', () => {
  let component: SalaryHolidayConfigComponent;
  let fixture: ComponentFixture<SalaryHolidayConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalaryHolidayConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalaryHolidayConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
