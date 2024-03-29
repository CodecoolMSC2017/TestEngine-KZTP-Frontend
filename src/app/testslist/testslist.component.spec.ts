import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestslistComponent } from './testslist.component';

describe('TestslistComponent', () => {
  let component: TestslistComponent;
  let fixture: ComponentFixture<TestslistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestslistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
