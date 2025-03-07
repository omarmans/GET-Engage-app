import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { HeaderTitleComponent } from '../../shared/header-title/header-title.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Merchant } from '../models/Mecrhant.model';
import { merchantArray } from '../models/merchantArray';
import { AssignVousherComponent } from '../assign-vousher/assign-vousher.component';
import { CommonModule } from '@angular/common';
import { Voucher } from '../models/vousher.model';

@Component({
  selector: 'app-merchant-details',
  standalone: true,
  imports: [HeaderTitleComponent, AssignVousherComponent, CommonModule],
  templateUrl: './merchant-details.component.html',
  styleUrl: './merchant-details.component.scss',
})
export class MerchantDetailsComponent implements OnInit {
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

  constructor(private router: Router) {}

  onShowTable() {
    this.router.navigate(['/pending-commission'], {
      queryParams: { companyTitle: this.merchant?.companyTitle }
    });
  }
}
