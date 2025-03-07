import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingCommissionComponent } from './pending-commission.component';

describe('PendingCommissionComponent', () => {
  let component: PendingCommissionComponent;
  let fixture: ComponentFixture<PendingCommissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PendingCommissionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PendingCommissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
