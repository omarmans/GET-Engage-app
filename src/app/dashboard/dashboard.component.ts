import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Merchant } from '../Merchant/models/Mecrhant.model';
import { merchantArray } from '../Merchant/models/merchantArray';
import { Voucher } from '../Merchant/models/vousher.model';
import { HeaderTitleComponent } from '../shared/header-title/header-title.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [HeaderTitleComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.merchant = this.Merchants.find((m: Merchant) => m.id === id);
    console.log(this.merchant);
  }
  showForm = false;
  showTable = false;
  merchant?: Merchant;
  Merchants: Merchant[] = merchantArray;
  route = inject(ActivatedRoute);

  vouchers: Voucher[] = [
    {
      id: 1,
      merchantAssignedDate: '2025-01-01',
      clientAssignedDate: '2025-01-05',
      valid: true,
      discountAmount: 50,
      commission: 10,
      used: true,
    },
    {
      id: 2,
      merchantAssignedDate: '2025-01-02',
      clientAssignedDate: '2025-01-06',
      valid: false,
      discountAmount: 30,
      commission: 5,
      used: false,
    },
    {
      id: 3,
      merchantAssignedDate: '2025-01-03',
      clientAssignedDate: '2025-01-07',
      valid: true,
      discountAmount: 20,
      commission: 3,
      used: true,
    },
  ];

  onShowTable() {
    this.showTable = !this.showTable;
  }
}
