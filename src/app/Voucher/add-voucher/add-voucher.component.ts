import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { VouchersService } from '../services/vouchers.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-voucher',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './add-voucher.component.html',
  styleUrl: './add-voucher.component.scss'
})
export class AddVoucherComponent implements OnInit {
  pageTitle: string = 'Add Voucher';
  voucherName: string = '';
  discount: number=0;
  voucherForm!: FormGroup;

  constructor(private fb: FormBuilder,private route: ActivatedRoute,private toast:ToastrService,private router :Router, private voucher:VouchersService) {
    
  }


  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['title']) {
        this.pageTitle = params['title'];
      }
      if (params['name']) {
        this.voucherName = params['name'];
      }
      if (params['discount']) {
        this.discount = params['discount'];
      }
    });
    this.voucherForm = this.fb.group({
      name: [this.voucherName, Validators.required],
      numberOfUsed: [1, [Validators.required, Validators.min(1)]],
      commtion: [0, [Validators.required, Validators.min(0)]],
      countity: [1, [Validators.required, Validators.min(1)]],
      validDate: ['', Validators.required],
      discountValue: [this.discount, [Validators.required, Validators.min(1), Validators.max(100)]],
    });
  }
  
  submitForm() {
    if (this.voucherForm.valid) {
      // console.log('Form Data:', this.voucherForm.value);
      // alert('Voucher Added Successfully!');
      // this.voucherForm.reset();
      console.log('voucher object :',this.voucherForm.value)
      this.voucher.addvoucher(this.voucherForm.value).subscribe({
        next:(response)=>{
          console.log('added voucher successful!',response);
          this.toast.success('added voucher successful!');
          this.router.navigate(['/vouchers'])
        },
        error:(error)=>{
          console.log('failed voucher sorry!',error);
          this.toast.error('failed voucher sorry!');
        }
      })


    }
  }
}
