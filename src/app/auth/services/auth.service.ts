import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://10.3.21.25:8109/api/account/';
  
  constructor(private http: HttpClient) {}

  private userEmail = new BehaviorSubject<string | null>(localStorage.getItem('userEmail'));
  userEmail$ = this.userEmail.asObservable();

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(!!localStorage.getItem('userEmail'));
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  setUserEmail(email: string | null) {
    if (email) {
      localStorage.setItem('userEmail', email);
      this.isAuthenticatedSubject.next(true);
    } else {
      localStorage.removeItem('userEmail');
      this.isAuthenticatedSubject.next(false);
    }
    this.userEmail.next(email);
  }

  register(userData: any): Observable<any> {
    return this.http.post(this.apiUrl + 'register', userData);
  }

  login(userData: any): Observable<any> {
    return this.http.post<{ email: string }>(this.apiUrl + 'login', userData).pipe(
      tap(response => {
        if (response.email) {
          this.setUserEmail(response.email);
        }
      })
    );
  }

  logout() {
    this.setUserEmail(null);
  }
}
