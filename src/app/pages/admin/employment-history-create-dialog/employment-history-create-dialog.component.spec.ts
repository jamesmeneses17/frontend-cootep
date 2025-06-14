import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmploymentHistoryCreateDialogComponent } from './employment-history-create-dialog.component';

describe('EmploymentHistoryCreateDialogComponent', () => {
  let component: EmploymentHistoryCreateDialogComponent;
  let fixture: ComponentFixture<EmploymentHistoryCreateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmploymentHistoryCreateDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmploymentHistoryCreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
