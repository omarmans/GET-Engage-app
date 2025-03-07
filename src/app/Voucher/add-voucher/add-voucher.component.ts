import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';

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

  constructor(private fb: FormBuilder,private route: ActivatedRoute,) {
    
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
      usedNumber: [0, [Validators.required, Validators.min(1)]],
      discountValue: [this.discount, [Validators.required, Validators.min(1), Validators.max(100)]],
      commission: [0, [Validators.required, Validators.min(0)]],
      quantity: [1, [Validators.required, Validators.min(1)]],
      validationDate: ['', Validators.required]
    });
  }
  
  submitForm() {
    if (this.voucherForm.valid) {
      console.log('Form Data:', this.voucherForm.value);
      alert('Voucher Added Successfully!');
      this.voucherForm.reset();
    }
  }
}
