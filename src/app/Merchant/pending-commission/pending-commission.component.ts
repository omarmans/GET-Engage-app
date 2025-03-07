import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderTitleComponent } from '../../shared/header-title/header-title.component';
import { Merchant } from '../models/Mecrhant.model';
import { merchantArray } from '../models/merchantArray';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pending-commission',
  standalone: true,
  imports: [CommonModule,HeaderTitleComponent],
  templateUrl: './pending-commission.component.html',
  styleUrl: './pending-commission.component.scss'
})
export class PendingCommissionComponent implements OnInit{
  
  companyTitle:string='';
  constructor(private route: ActivatedRoute) {
      
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

 
}
