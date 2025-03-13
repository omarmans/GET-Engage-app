import { Routes } from '@angular/router';
import { LogInComponent } from './auth/components/log-in/log-in.component';
import { SignUpComponent } from './auth/components/sign-up/sign-up.component';
import { MerchantsComponent } from './Merchant/merchants/merchants.component';
import { AddMerchantComponent } from './Merchant/add-merchant/add-merchant.component';
import { MerchantDetailsComponent } from './Merchant/merchant-details/merchant-details.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { VouchersComponent } from './Voucher/vouchers/vouchers.component';
import { AddVoucherComponent } from './Voucher/add-voucher/add-voucher.component';
import { PendingCommissionComponent } from './Merchant/pending-commission/pending-commission.component';
import { authGuard } from './guard/auth.guard';
import { MerchantDashboardComponent } from './merchant-dashboard/merchant-dashboard.component';

export const routes: Routes = [
  { path: '', component: LogInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'mer-dashboard', component: MerchantDashboardComponent, canActivate: [authGuard] },
  { path: 'merchants', component: MerchantsComponent, canActivate: [authGuard] },
  { path: 'add-merchants', component: AddMerchantComponent, canActivate: [authGuard] },
  { path: 'merchant-details/:name', component: MerchantDetailsComponent, canActivate: [authGuard] },
  { path: 'vouchers', component: VouchersComponent, canActivate: [authGuard] },
  { path: 'add-voucher', component: AddVoucherComponent, canActivate: [authGuard] },
  { path: 'pending-commission', component: PendingCommissionComponent, canActivate: [authGuard] },

  { path: '**', redirectTo: '' }
];
