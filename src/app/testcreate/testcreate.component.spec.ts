import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestcreateComponent } from './testcreate.component';

describe('TestcreateComponent', () => {
  let component: TestcreateComponent;
  let fixture: ComponentFixture<TestcreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestcreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestcreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
