import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ApiService } from './api.service';
import { LoginRequest, ApiResponse, RegisterRequest } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private apiService: ApiService) { }

  private hasToken(): boolean {
    return !!localStorage.getItem('authToken');
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  login(credentials: LoginRequest): Observable<ApiResponse> {
    // Criar token Basic Auth
    const token = btoa(`${credentials.username}:${credentials.password}`);
    localStorage.setItem('authToken', token);
    this.loggedIn.next(true);

    // Simular resposta de sucesso
    return new Observable(observer => {
      observer.next({ message: 'Login realizado com sucesso!' });
      observer.complete();
    });
  }

  register(credentials: RegisterRequest): Observable<ApiResponse> {
    return this.apiService.post<ApiResponse>('/users/', credentials);
  }

  logout(): void {
    localStorage.removeItem('authToken');
    this.loggedIn.next(false);
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }
}
