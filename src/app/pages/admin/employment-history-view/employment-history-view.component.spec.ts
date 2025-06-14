import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmploymentHistoryViewComponent } from './employment-history-view.component';

describe('EmploymentHistoryViewComponent', () => {
  let component: EmploymentHistoryViewComponent;
  let fixture: ComponentFixture<EmploymentHistoryViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmploymentHistoryViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmploymentHistoryViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
