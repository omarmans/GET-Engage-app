import { Component, inject } from '@angular/core';
import { SearchComponent } from '../../shared/search/search.component';
import { CommonModule } from '@angular/common';
import { HeaderTitleComponent } from '../../shared/header-title/header-title.component';
import { Router } from '@angular/router';
import { Merchant } from '../models/Mecrhant.model';
import { merchantArray } from '../models/merchantArray';

@Component({
  selector: 'app-merchants',
  standalone: true,
  imports: [SearchComponent, CommonModule, HeaderTitleComponent],
  templateUrl: './merchants.component.html',
  styleUrl: './merchants.component.scss',
})
export class MerchantsComponent {
  router = inject(Router);
  Merchants? = merchantArray;
  addMerchant() {
    this.router.navigate(['/add-merchants']);
  }

  merchantDetails(id: number) {
    this.router.navigate(['/merchant-details', +id]);
  }
}
