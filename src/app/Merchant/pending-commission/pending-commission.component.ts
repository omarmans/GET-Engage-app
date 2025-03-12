import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderTitleComponent } from '../../shared/header-title/header-title.component';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-pending-commission',
  standalone: true,
  imports: [CommonModule,HeaderTitleComponent,FormsModule],
  templateUrl: './pending-commission.component.html',
  styleUrl: './pending-commission.component.scss'
})
export class PendingCommissionComponent implements OnInit{
  
  companyTitle:string='';
  constructor(private route: ActivatedRoute,private toast:ToastrService) {
      
    }
    ngOnInit(): void {
      this.route.queryParams.subscribe(params => {
        this.companyTitle = params['companyTitle'] || 'Unknown Company';
      });
    }

  vouchers = [
    { id: 101, merchantAssignedDate: '2025-02-01', clientAssignedDate: '2025-02-05', valid: true, discountAmount: 50, commission: 5, used: true },
    { id: 102, merchantAssignedDate: '2025-02-02', clientAssignedDate: '2025-02-06', valid: false, discountAmount: 40, commission: 4, used: false },
    { id: 103, merchantAssignedDate: '2025-02-02', clientAssignedDate: '2025-02-06', valid: false, discountAmount: 40, commission: 4, used: false },
    { id: 104, merchantAssignedDate: '2025-02-02', clientAssignedDate: '2025-02-06', valid: false, discountAmount: 40, commission: 4, used: false },
    { id: 105, merchantAssignedDate: '2025-02-02', clientAssignedDate: '2025-02-06', valid: false, discountAmount: 40, commission: 4, used: false },
  ];
  showSettlePopup: boolean = false;
  settleAmount: number = 0;

  openSettlePopup() {
      this.showSettlePopup = true;
  }

  closeSettlePopup() {
      this.showSettlePopup = false;
  }

  submitSettle() {
      if (this.settleAmount > 0) {
          console.log("Settled amount:", this.settleAmount);
          this.toast.success(`Settled amount: ${this.settleAmount} EGP`);
          this.closeSettlePopup();
      } else {
          alert("Please enter a valid amount.");
      }
  }
 
}
