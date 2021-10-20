import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllProjectEntriesComponent } from './all-project-entries.component';

describe('AllProjectEntriesComponent', () => {
  let component: AllProjectEntriesComponent;
  let fixture: ComponentFixture<AllProjectEntriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllProjectEntriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllProjectEntriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
