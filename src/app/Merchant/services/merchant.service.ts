import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Merchant } from '../../models/Merchant.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MerchantService {
  private addapi = 'http://10.3.21.25:8109/api/app/mercant/mercant';
  private get=' http://10.3.21.25:8109/api/app/mercant/merchant';

  constructor(private http:HttpClient) { }

  addmerchant(data:any):Observable<any>{
    return this.http.post<any>(this.addapi, data, {
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      }
  });

  }

  getmerchant():Observable<{ data: Merchant[] }>{
    return this.http.get<{ data: Merchant[] }>(this.get);
  }
}
