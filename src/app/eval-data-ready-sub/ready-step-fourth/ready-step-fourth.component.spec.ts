import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadyStepFourthComponent } from './ready-step-fourth.component';

describe('ReadyStepFourthComponent', () => {
  let component: ReadyStepFourthComponent;
  let fixture: ComponentFixture<ReadyStepFourthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadyStepFourthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadyStepFourthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
