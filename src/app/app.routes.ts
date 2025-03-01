import { Routes } from '@angular/router';
import { LogInComponent } from './auth/components/log-in/log-in.component';
import { SignUpComponent } from './auth/components/sign-up/sign-up.component';
import { MerchantsComponent } from './Merchant/merchants/merchants.component';
import { AddMerchantComponent } from './Merchant/add-merchant/add-merchant.component';
import { MerchantDetailsComponent } from './Merchant/merchant-details/merchant-details.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { VouchersComponent } from './Voucher/vouchers/vouchers.component';
import { AddVoucherComponent } from './Voucher/add-voucher/add-voucher.component';

export const routes: Routes = [
  { path: '', component: LogInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'merchants', component: MerchantsComponent },
  { path: 'add-merchants', component: AddMerchantComponent },
  { path: 'merchant-details/:id', component: MerchantDetailsComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'vouchers', component: VouchersComponent },
  { path: 'add-voucher', component: AddVoucherComponent },
];
