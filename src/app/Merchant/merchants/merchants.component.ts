import { Component, inject, OnInit } from '@angular/core';
import { SearchComponent } from '../../shared/search/search.component';
import { CommonModule } from '@angular/common';
import { HeaderTitleComponent } from '../../shared/header-title/header-title.component';
import { Router } from '@angular/router';
import { Merchant } from '../../models/Merchant.model';
import { merchantArray } from '../models/merchantArray';
import { MerchantService } from '../services/merchant.service';

@Component({
  selector: 'app-merchants',
  standalone: true,
  imports: [SearchComponent, CommonModule, HeaderTitleComponent],
  templateUrl: './merchants.component.html',
  styleUrl: './merchants.component.scss',
})
export class MerchantsComponent implements OnInit {
  Merchants! :Merchant[];
  router = inject(Router);
  constructor(private merchant:MerchantService){
    
  }
  ngOnInit(): void {
    this.loadmerchants();
  }
  loadmerchants(){
    this.merchant.getmerchant().subscribe({
      next:(response)=>{
        console.log('API Response:', response);
        this.Merchants=response.data || [];
      },
      error:(error)=>{
        console.log('API error:', error);
      }
    })
  }

  addMerchant() {
    this.router.navigate(['/add-merchants']);
  }

  merchantDetails(id: number) {
    this.router.navigate(['/merchant-details', +id]);
  }
}
