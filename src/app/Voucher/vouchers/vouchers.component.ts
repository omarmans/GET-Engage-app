import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Router,RouterModule } from '@angular/router';
import { VouchersService } from '../services/vouchers.service';
import { Voucher } from '../../models/Vousher.model';
import { SearchComponent } from "../../shared/search/search.component";
import { HideLongNamePipe } from '../../shared/pipes/hide-long-name.pipe';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-vouchers',
  standalone: true,
  imports: [CarouselModule, CommonModule, ReactiveFormsModule,RouterModule, HideLongNamePipe],
  templateUrl: './vouchers.component.html',
  styleUrl: './vouchers.component.scss'
})
export class VouchersComponent implements OnInit {
  vouchers! : Voucher[];
  filteredVouchers: Voucher[] = [];
  userEmail: string | null = null;
  isAssignPopupOpen = false;
  selectedVoucher = '';
  assignForm!: FormGroup;

  constructor(private router :Router ,private voucher:VouchersService , private fb:FormBuilder){
   
  }
  ngOnInit(): void {
    this.userEmail = localStorage.getItem('userEmail'); 
    this.loadVouchers();

    this.assignForm = this.fb.group({
      name: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern('^01[0-9]{9}$')]],
      email: ['', [Validators.required, Validators.email]],
      voucher: ['', Validators.required]
    });
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
  
  openAssignPopup() {
    this.isAssignPopupOpen = true;
  }

  closeAssignPopup() {
    this.isAssignPopupOpen = false;
    this.assignForm.reset(); // إعادة تعيين القيم بعد الإغلاق
  }

  assignVoucher() {
    if (this.assignForm.valid) {
      console.log('Assigned Voucher:', this.assignForm.value);
      this.isAssignPopupOpen = false;
    } else {
      console.log('Form is invalid');
      this.assignForm.markAllAsTouched(); // إظهار الأخطاء للمستخدم
    }
  }
  
}