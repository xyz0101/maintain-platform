import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadyStepFifthComponent } from './ready-step-fifth.component';

describe('ReadyStepFifthComponent', () => {
  let component: ReadyStepFifthComponent;
  let fixture: ComponentFixture<ReadyStepFifthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadyStepFifthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadyStepFifthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
