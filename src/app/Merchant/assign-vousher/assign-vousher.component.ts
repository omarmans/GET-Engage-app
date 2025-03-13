import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { VouchersService } from '../../Voucher/services/vouchers.service';
import { Voucher } from '../../models/Vousher.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MerchantService } from '../services/merchant.service';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-assign-vousher',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './assign-vousher.component.html',
  styleUrl: './assign-vousher.component.scss',
})
export class AssignVousherComponent implements OnInit {
  @Input() showForm = false;
  @Output() closeForm = new EventEmitter<void>();

  vouchers: any[] = [];
  merchants: any[] = [];
  assignForm!: FormGroup;
  availableBalance: number = 0;
  quantityExceeds: boolean = false;

  constructor(
    private voucher: VouchersService,
    private toast: ToastrService,
    private merchant: MerchantService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.assignForm = this.fb.group({
      merchantId: ['', Validators.required],
      voucherId: ['', Validators.required],
      number: ['', [Validators.required, Validators.min(1)]],
    });

    this.loadVouchers();
    this.loadMerchants();

    this.assignForm.get('voucherId')?.valueChanges.subscribe((voucherId) => {
      this.updateAvailableBalance(voucherId);
    });
  }

  updateAvailableBalance(voucherId: any) {
    const selectedVoucher = this.vouchers.find((v) => v.id === voucherId);
    this.availableBalance = selectedVoucher
      ? selectedVoucher.avaliableBalance
      : 0;
  }

  assignVoucher() {
    const enteredQuantity = this.assignForm.get('number')?.value;

    if (enteredQuantity > this.availableBalance) {
      this.quantityExceeds = true;
      return;
    } else {
      this.quantityExceeds = false;
    }

    if (this.assignForm.invalid) {
      this.toast.error('Please fill all required fields.');
      return;
    }

    this.merchant.assigndata(this.assignForm.value).subscribe({
      next: () => {
        this.toast.success('Voucher Assigned Successfully!');
        this.assignForm.reset();
        this.close();
        this.loadMerchants();
        this.loadVouchers();
      },
      error: () => {
        this.toast.error("Voucher can't be assigned!");
      },
    });
  }

  loadVouchers() {
    this.voucher.getvouchers().subscribe({
      next: (res) => {
        this.vouchers = res.data;
      },
      error: (error) => {
        console.error('Error loading vouchers', error);
      },
    });
  }

  loadMerchants() {
    this.merchant.getmerchant().subscribe({
      next: (res) => {
        this.merchants = res.data;
      },
      error: (error) => {
        console.error('Error loading merchants', error);
      },
    });
  }

  close() {
    this.closeForm.emit();
  }
}
