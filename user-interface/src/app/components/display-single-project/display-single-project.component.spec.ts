import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplaySingleProjectComponent } from './display-single-project.component';

describe('DisplaySingleProjectComponent', () => {
  let component: DisplaySingleProjectComponent;
  let fixture: ComponentFixture<DisplaySingleProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplaySingleProjectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplaySingleProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
