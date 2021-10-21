import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProjectEntryComponent } from './create-project-entry.component';

describe('CreateProjectEntryComponent', () => {
  let component: CreateProjectEntryComponent;
  let fixture: ComponentFixture<CreateProjectEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateProjectEntryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateProjectEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
