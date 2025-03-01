import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Router,RouterModule } from '@angular/router';

@Component({
  selector: 'app-vouchers',
  standalone: true,
  imports: [CarouselModule,CommonModule,RouterModule],
  templateUrl: './vouchers.component.html',
  styleUrl: './vouchers.component.scss'
})
export class VouchersComponent {
  constructor(private router :Router){}

  vouchers = [
    { id: 1, name: 'Voucher 1', discount: 25, date: '19-2-2025 12:00:00', quantity: 0, timeframe: '19-2-2025 12:00:00', showMenu: false },
    { id: 2, name: 'Voucher 2', discount: 30, date: '20-2-2025 10:30:00', quantity: 5, timeframe: '21-2-2025 10:30:00', showMenu: false },
    { id: 3, name: 'Voucher 3', discount: 15, date: '21-2-2025 08:00:00', quantity: 2, timeframe: '22-2-2025 08:00:00', showMenu: false },
    { id: 4, name: 'Voucher 1', discount: 25, date: '19-2-2025 12:00:00', quantity: 0, timeframe: '19-2-2025 12:00:00', showMenu: false },
    { id: 5, name: 'Voucher 2', discount: 30, date: '20-2-2025 10:30:00', quantity: 5, timeframe: '21-2-2025 10:30:00', showMenu: false },
    { id: 6, name: 'Voucher 3', discount: 15, date: '21-2-2025 08:00:00', quantity: 2, timeframe: '22-2-2025 08:00:00', showMenu: false }
  ];
  

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