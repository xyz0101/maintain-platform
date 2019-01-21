import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvalMaintainComponent } from './eval-maintain.component';

describe('EvalMaintainComponent', () => {
  let component: EvalMaintainComponent;
  let fixture: ComponentFixture<EvalMaintainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvalMaintainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvalMaintainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
