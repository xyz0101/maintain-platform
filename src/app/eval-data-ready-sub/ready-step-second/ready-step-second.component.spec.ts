import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadyStepSecondComponent } from './ready-step-second.component';

describe('ReadyStepSecondComponent', () => {
  let component: ReadyStepSecondComponent;
  let fixture: ComponentFixture<ReadyStepSecondComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadyStepSecondComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadyStepSecondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
