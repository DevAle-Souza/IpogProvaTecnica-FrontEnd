import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
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
    const token = btoa(`${credentials.username}:${credentials.password}`);
    const originalToken = localStorage.getItem('authToken');
    localStorage.setItem('authToken', token);

    return this.apiService.get<any>('/tasks/', { page: '0', size: '1', sort: 'id,asc' }).pipe(
      tap(() => {
        this.loggedIn.next(true);
      }),
      map(() => ({ message: 'Login realizado com sucesso!' })),
      catchError(error => {
        if (originalToken) {
          localStorage.setItem('authToken', originalToken);
        } else {
          localStorage.removeItem('authToken');
        }

        if (error.status === 401 || error.status === 403) {
          return throwError(() => new Error('Usuário não encontrado ou credenciais inválidas'));
        }
        return throwError(() => new Error('Erro de conexão. Tente novamente.'));
      })
    );
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
