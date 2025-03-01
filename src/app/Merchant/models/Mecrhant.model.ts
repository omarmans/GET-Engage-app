export interface Merchant {
  id: number;
  imgs: string;
  companyTitle: string;
  totalVouchers: number;
  totalUsedVouchers: number;
  totalUnusedVouchers: number;
  pendingCommission: number;
  paidCommission: number;
}
