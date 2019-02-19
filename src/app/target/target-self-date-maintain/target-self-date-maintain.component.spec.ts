import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetSelfDateMaintainComponent } from './target-self-date-maintain.component';

describe('TargetSelfDateMaintainComponent', () => {
  let component: TargetSelfDateMaintainComponent;
  let fixture: ComponentFixture<TargetSelfDateMaintainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TargetSelfDateMaintainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TargetSelfDateMaintainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
