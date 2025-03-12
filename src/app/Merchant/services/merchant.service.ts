import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Merchant } from '../../models/Merchant.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MerchantService {
  private api = 'http://10.3.21.25:8109/api/app/mercant/';
  private ass='http://10.3.21.25:8109/api/app/voucher/assign-mershant-to-voucher-details';
private apidetails='http://10.3.21.25:8109/api/app/mercant/merchant-by-name';
  constructor(private http:HttpClient) { }

  addmerchant(data:any):Observable<any>{
    return this.http.post<any>(this.api+'mercant', data);
  }

  getmerchant():Observable<{ data: Merchant[] }>{
    return this.http.get<{ data: Merchant[] }>(this.api+'merchant');
  }
  getmerchantByname(name: string): Observable<any> {
    return this.http.get<any>(`${this.apidetails}?Name=${name}`);
}

  assigndata(data:any):Observable<any>{
    return this.http.post<any>(this.ass, data);
  }
}
