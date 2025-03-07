import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Merchant } from '../../models/Merchant.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MerchantService {
  private api = 'http://10.3.21.25:8109/api/app/mercant/';

  constructor(private http:HttpClient) { }

  addmerchant(data:any):Observable<any>{
    return this.http.post<any>(this.api+'mercant', data, {
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      }
  });

  }

  getmerchant():Observable<{ data: Merchant[] }>{
    return this.http.get<{ data: Merchant[] }>(this.api+'merchant');
  }
}
