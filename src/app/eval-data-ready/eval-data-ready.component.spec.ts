import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvalDataReadyComponent } from './eval-data-ready.component';

describe('EvalDataReadyComponent', () => {
  let component: EvalDataReadyComponent;
  let fixture: ComponentFixture<EvalDataReadyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvalDataReadyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvalDataReadyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
