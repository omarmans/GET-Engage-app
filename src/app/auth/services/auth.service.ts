import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Form } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://10.3.21.25:8109/api/account/'; 
  constructor(private http: HttpClient) {}

  register(userData: any): Observable<any> {
    return this.http.post(this.apiUrl+'register', userData);
  }
  login(userData: any): Observable<any> {
    return this.http.post(this.apiUrl+'login', userData);
  }
}
