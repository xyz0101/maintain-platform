import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetSelfTodoComponent } from './target-self-todo.component';

describe('TargetSelfTodoComponent', () => {
  let component: TargetSelfTodoComponent;
  let fixture: ComponentFixture<TargetSelfTodoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TargetSelfTodoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TargetSelfTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
