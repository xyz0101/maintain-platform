import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadyStepOneComponent } from './ready-step-one.component';

describe('ReadyStepOneComponent', () => {
  let component: ReadyStepOneComponent;
  let fixture: ComponentFixture<ReadyStepOneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadyStepOneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadyStepOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
