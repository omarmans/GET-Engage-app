import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Router,RouterModule } from '@angular/router';
import { VouchersService } from '../services/vouchers.service';
import { Voucher } from '../../models/Vousher.model';

@Component({
  selector: 'app-vouchers',
  standalone: true,
  imports: [CarouselModule,CommonModule,RouterModule],
  templateUrl: './vouchers.component.html',
  styleUrl: './vouchers.component.scss'
})
export class VouchersComponent implements OnInit {
  vouchers! : Voucher[];
  

  constructor(private router :Router ,private voucher:VouchersService){
   
  }
  ngOnInit(): void {
    this.loadVouchers();
  }
  loadVouchers() {
    this.voucher.getvouchers().subscribe({
      next: (response) => {
        console.log('API Response:', response);
        this.vouchers = response || [];
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
    return card.quantity > 0; 
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
  
  
}