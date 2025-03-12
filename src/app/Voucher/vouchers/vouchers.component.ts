import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Router,RouterModule } from '@angular/router';
import { VouchersService } from '../services/vouchers.service';
import { Voucher } from '../../models/Vousher.model';
import { SearchComponent } from "../../shared/search/search.component";
import { HideLongNamePipe } from '../../shared/pipes/hide-long-name.pipe';

@Component({
  selector: 'app-vouchers',
  standalone: true,
  imports: [CarouselModule, CommonModule, RouterModule, HideLongNamePipe],
  templateUrl: './vouchers.component.html',
  styleUrl: './vouchers.component.scss'
})
export class VouchersComponent implements OnInit {
  vouchers! : Voucher[];
  filteredVouchers: Voucher[] = [];
  

  constructor(private router :Router ,private voucher:VouchersService){
   
  }
  ngOnInit(): void {
    this.loadVouchers();
  }
  loadVouchers() {
    this.voucher.getvouchers().subscribe({
      next: (response) => {
        console.log('API Response:', response);
        this.vouchers = response.data || [];
        this.filteredVouchers=[...this.vouchers];
      },
      error: (error) => {
        console.error('API error:', error);
        alert('Failed to load vouchers. Please try again later.');
      }
    });
  }
  

  customOptions: OwlOptions = {
    loop: true,
    center: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    autoplay: false,
    autoplaySpeed: 1000, 
    smartSpeed: 800, 
    responsive: {
      0: { items: 1, }, 
      600: { items: 2, },
      1000: { items: 3, }
    }
  };
  

  trackById(index: number, item: any): number {
    return item.id;
  }
  isActive(card: any): boolean {
    const currentDate = new Date().getTime();
    const validDate = new Date(card.validDate).getTime();
  
    return card.avaliableBalance > 0 && currentDate < validDate;
  }
  toggleMenu(card: any) {
    card.showMenu = !card.showMenu;
  }
  
  addQuantity(card: any) {
    this.router.navigate(['/add-voucher'], {
      queryParams: { title: 'Add Quantity', name: card.name , discount: card.discount}
    });
  }
  
  editTimeframe(card: any) {
    this.router.navigate(['/add-voucher'], {
      queryParams: { title: 'Edit TimeFrame', name: card.name , discount: card.discount}
    });
  }
  onSearchTextChanged(searchText: string) {
    this.filteredVouchers = this.vouchers.filter(voucher =>
      voucher.name.toLowerCase().includes(searchText.toLowerCase())
    );
  }
  
}