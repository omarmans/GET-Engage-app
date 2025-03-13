import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { ChartOptions, ChartType, ChartData } from 'chart.js';

import { HeaderTitleComponent } from '../shared/header-title/header-title.component';
import { Merchant } from '../models/Merchant.model';
import { Voucher } from '../models/Vousher.model';
import { MerchantService } from '../Merchant/services/merchant.service';
import { VouchersService } from '../Voucher/services/vouchers.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [HeaderTitleComponent, CommonModule, NgChartsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  showPopup: boolean = false;
  showPopupmerchant: boolean = false;
  showForm = false;
  showTable = false;

  Merchants!: Merchant[];
  vouchers!: Voucher[];
  nomer: number = 0;
  novou: number = 0;
  route = inject(ActivatedRoute);

  constructor(private mer: MerchantService, private vou: VouchersService) {}

  ngOnInit(): void {
    this.getmer();
    this.getvou();
  }

  onShowTable() {
    this.showTable = !this.showTable;
  }

  total() {
    this.showPopup = true;
  }

  closePopup() {
    this.showPopup = false;
  }

  totalmerchant() {
    this.showPopupmerchant = true;
  }

  closePopupmerchant() {
    this.showPopupmerchant = false;
  }

  getmer() {
    this.mer.getmerchant().subscribe({
      next: (res) => {
        this.Merchants = res.data || [];
        this.nomer = this.Merchants.length;
        this.updatePieChart();
      },
      error: (error) => {
        console.log(error, 'error');
      },
    });
  }

  getvou() {
    this.vou.getvouchers().subscribe({
      next: (res) => {
        this.vouchers = res.data || [];
        this.novou = this.vouchers.length;
        this.updatePieChart(); // Update Pie Chart dynamically
      },
      error: (error) => {
        console.log(error, 'error');
      },
    });
  }

  //  Update Pie Chart after data fetch
  updatePieChart() {
    this.pieChartData = {
      labels: [
        'Total number of vouchers',
        'Total number of merchants',
        'Total redemptions',
      ],
      datasets: [
        {
          data: [this.novou, this.nomer, this.nomer + this.novou],
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        },
      ],
    };
  }

  lineChartData: ChartData<'line'> = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      { data: [65, 59, 80, 81, 56, 55, 40], label: 'Sales' },
      { data: [28, 48, 40, 19, 86, 27, 90], label: 'Revenue' },
    ],
  };

  lineChartOptions: ChartOptions = { responsive: true };
  lineChartLegend = true;

  pieChartData: ChartData<'pie'> = {
    labels: [
      'Total number of vouchers',
      'Total number of merchants',
      'Total redemptions',
    ],
    datasets: [
      { data: [0, 0, 0], backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'] },
    ],
  };

  pieChartOptions: ChartOptions = { responsive: true };
  pieChartType: ChartType = 'pie';
}
