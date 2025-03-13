import { Component, inject, OnInit } from '@angular/core';
import { SearchComponent } from '../../shared/search/search.component';
import { CommonModule } from '@angular/common';
import { HeaderTitleComponent } from '../../shared/header-title/header-title.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Merchant } from '../../models/Merchant.model';
import { MerchantService } from '../services/merchant.service';
import { AssignVousherComponent } from '../assign-vousher/assign-vousher.component';

@Component({
  selector: 'app-merchants',
  standalone: true,
  imports: [
    SearchComponent,
    CommonModule,
    HeaderTitleComponent,
    AssignVousherComponent,
  ],
  templateUrl: './merchants.component.html',
  styleUrl: './merchants.component.scss',
})
export class MerchantsComponent implements OnInit {
  Merchants!: Merchant[];
  showForm = false;
  filteredMerchants: Merchant[] = [];

  router = inject(Router);
  constructor(private merchant: MerchantService) {}
  ngOnInit(): void {
    this.loadmerchants();
  }

  // ##################
  menuOpen = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
  // ##################
  loadmerchants() {
    this.merchant.getmerchant().subscribe({
      next: (response) => {
        console.log('API Response:', response);
        this.Merchants = response.data || [];
        this.filteredMerchants = [...this.Merchants];
      },
      error: (error) => {
        console.log('API error:', error);
      },
    });
  }

  addMerchant() {
    this.router.navigate(['/add-merchants']);
  }

  merchantDetails(name: string) {
    this.router.navigate(['/merchant-details', name]);
  }

  route = inject(ActivatedRoute);

  onSearchTextChanged(searchText: string) {
    this.filteredMerchants = this.Merchants.filter((merchant) =>
      merchant.name.toLowerCase().includes(searchText.toLowerCase())
    );
  }
}
