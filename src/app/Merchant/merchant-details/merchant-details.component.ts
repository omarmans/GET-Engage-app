import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { HeaderTitleComponent } from '../../shared/header-title/header-title.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignVousherComponent } from '../assign-vousher/assign-vousher.component';
import { CommonModule } from '@angular/common';
import { Merchant } from '../../models/Merchant.model';
import { MerchantService } from '../services/merchant.service';

@Component({
  selector: 'app-merchant-details',
  standalone: true,
  imports: [HeaderTitleComponent, AssignVousherComponent, CommonModule],
  templateUrl: './merchant-details.component.html',
  styleUrl: './merchant-details.component.scss',
})
export class MerchantDetailsComponent implements OnInit {
 
  showForm = false;
  showTable = false;
  merchant?: Merchant;
  Merchants!: Merchant[] ;
  route = inject(ActivatedRoute);

  vouchers: any[] = [
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

  constructor(private router: Router,private merchantService: MerchantService) {}

  onShowTable() {
    this.router.navigate(['/pending-commission'], {
      queryParams: { companyTitle: this.merchant?.name }
    });
  }

  ngOnInit(): void {
    const name = this.route.snapshot.paramMap.get('name');
    if (name) {
      this.getMerchantDetails(name);
    }
    
  }

  getMerchantDetails(name: string) {
    this.merchantService.getmerchantByname(name).subscribe({
      next: (response) => {
        if (response.isSuccess) {
          this.merchant = response.data;
          console.log('Merchant Details:', this.merchant);
        } else {
          console.log('Error:', response.erorrs);
        }
      },
      error: (error) => {
        console.log('Error fetching merchant details:', error);
      }
    });
  }

// }
}