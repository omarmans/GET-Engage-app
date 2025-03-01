export interface Voucher {
  id: number;
  merchantAssignedDate: string;
  clientAssignedDate: string;
  valid: boolean;
  discountAmount: number;
  commission: number;
  used: boolean;
}
