import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { VouchersService } from '../../Voucher/services/vouchers.service';
import { Voucher } from '../../models/Vousher.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Merchant } from '../../models/Merchant.model';
import { MerchantService } from '../services/merchant.service';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-assign-vousher',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './assign-vousher.component.html',
  styleUrl: './assign-vousher.component.scss',
})
export class AssignVousherComponent implements OnInit{
  @Input() showForm = false;
  @Output() closeForm = new EventEmitter<void>();

  vouchers!:Voucher[];
  merchants!:Merchant[];
  assignForm!: FormGroup; 

  close() {
    this.closeForm.emit();
  }
  constructor(private voucher:VouchersService ,private toast: ToastrService, private merchant : MerchantService,private fb: FormBuilder ){}

  ngOnInit(): void {
    this.initializeForm();
    this.loadvouchers();
    this.loadmerchants();
  }
  initializeForm() {
    this.assignForm = this.fb.group({
      merchantId: ['', Validators.required],
      voucherId: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(1)]],
    });
  }
  loadvouchers(){
    this.voucher.getvouchers().subscribe({
      next:(res)=>{
        this.vouchers=res.data;
        console.log('vouchers',this.vouchers);
        
      },
      error:(error)=>{
        console.log('error',error);
      }
    })
  }
  loadmerchants(){
    this.merchant.getmerchant().subscribe({
      next:(res)=>{

        this.merchants=res.data;
        console.log('merchant',this.merchants);
      },
      error:(error)=>{
        console.log('error',error);
      }
    })
  }
  assignVoucher() {
    if (this.assignForm.invalid) {
      alert('Please fill all required fields.');
      return;
    }
    this.merchant.assigndata(this.assignForm.value).subscribe({
      next:(res)=>{
        console.log('respone of assign',res);
        this.toast.success('Voucher Assigned Successfully!');
        this.assignForm.reset();
        this.close();
      },
      error:()=>{
        this.toast.error("Voucher can't Assign !");
      }
    })
  
  }
}
