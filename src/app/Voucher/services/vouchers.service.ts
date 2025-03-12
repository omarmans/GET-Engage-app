import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Voucher } from '../../models/Vousher.model';

@Injectable({
  providedIn: 'root'
})
export class VouchersService {
  private api='http://10.3.21.25:8109/api/app/voucher/voucher';
private details='http://10.3.21.25:8109/api/app/voucher/voucher-details';
  constructor(private http:HttpClient) { }

   addvoucher(data:any):Observable<any>{
      return this.http.post<any>(this.api, data);
  }
   getvouchers(): Observable<{ data: Voucher[]} > {
    return this.http.get<{ data: Voucher[] }>(this.api).pipe(
      catchError(error => {
        console.error('Error fetching vouchers:', error);
        return throwError(() => new Error('Failed to fetch vouchers.'));
      })
    );
  }
   getvouchersdetails(): Observable<{ data: Voucher[]} > {
    return this.http.get<{ data: Voucher[] }>(this.details).pipe(
      catchError(error => {
        console.error('Error fetching vouchers:', error);
        return throwError(() => new Error('Failed to fetch vouchers.'));
      })
    );
  }
}
