import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Voucher } from '../../models/Vousher.model';

@Injectable({
  providedIn: 'root'
})
export class VouchersService {
  private api='http://10.3.21.25:8109/api/app/voucher/voucher';

  constructor(private http:HttpClient) { }

   addvoucher(data:any):Observable<any>{
      return this.http.post<any>(this.api, data, {
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        }
    });
  }
   getvouchers(): Observable<Voucher[]> {
    return this.http.get<Voucher[]>(this.api).pipe(
      catchError(error => {
        console.error('Error fetching vouchers:', error);
        return throwError(() => new Error('Failed to fetch vouchers.'));
      })
    );
  }
}
