import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadyStepThirdComponent } from './ready-step-third.component';

describe('ReadyStepThirdComponent', () => {
  let component: ReadyStepThirdComponent;
  let fixture: ComponentFixture<ReadyStepThirdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadyStepThirdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadyStepThirdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
