import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetMaintainComponent } from './target-maintain.component';

describe('TargetMaintainComponent', () => {
  let component: TargetMaintainComponent;
  let fixture: ComponentFixture<TargetMaintainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TargetMaintainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TargetMaintainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
