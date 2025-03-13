import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { HeaderTitleComponent } from '../shared/header-title/header-title.component';
import { CommonModule } from '@angular/common';
import { Merchant } from '../models/Merchant.model';
import { Voucher } from '../models/Vousher.model';
import { MerchantService } from '../Merchant/services/merchant.service';
import { VouchersService } from '../Voucher/services/vouchers.service';

@Component({
  selector: 'app-merchant-dashboard',
  standalone: true,
  imports: [HeaderTitleComponent, CommonModule],
  templateUrl: './merchant-dashboard.component.html',
  styleUrl: './merchant-dashboard.component.scss'
})
export class MerchantDashboardComponent implements OnInit{
  showPopup: boolean=false;
  showPopupmerchant: boolean=false;
 
  constructor(private mer:MerchantService, private vou:VouchersService){}
  ngOnInit(): void {
    this.getmer();
    this.getvou();

  }
  showForm = false;
  showTable = false;
  Merchants!: Merchant[];
  route = inject(ActivatedRoute);

  vouchers!: Voucher[] 
  novou:number=0;
  nomer:number=0;

  onShowTable() {
    this.showTable = !this.showTable;
  }
  
  total() {
    this.showPopup = true; 
  }

  closePopup() {
    this.showPopup = false; 
  }
  totalmerchant(){
    this.showPopupmerchant=true;
  }
  closePopupmerchant(){
    this.showPopupmerchant=false;
  }
  getmer(){
    this.mer.getmerchant().subscribe({
      next:(res)=>{
        this.Merchants=res.data||[]
        console.log('respone mer',this.Merchants);
        this.nomer=res.data.length;
      },
      error:(error)=>{
        console.log(error,'error')
      }
    })
  }
  getvou(){
    this.vou.getvouchers().subscribe({
      next:(res)=>{
        this.vouchers=res.data||[]
        console.log('respone voucher',this.vouchers);
        this.novou=res.data.length;
      },
      error:(error)=>{
        console.log(error,'error')
      }
    })
  }


}
