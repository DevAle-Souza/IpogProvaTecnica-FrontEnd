import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly API_URL = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Basic ${token}` })
    });
  }

  get<T>(path: string, params?: any): Observable<T> {
    return this.http.get<T>(`${this.API_URL}${path}`, {
      headers: this.getHeaders(),
      params
    });
  }

  post<T>(path: string, body: any): Observable<T> {
    return this.http.post<T>(`${this.API_URL}${path}`, body, {
      headers: this.getHeaders()
    });
  }

  put<T>(path: string, body: any): Observable<T> {
    return this.http.put<T>(`${this.API_URL}${path}`, body, {
      headers: this.getHeaders()
    });
  }

  delete<T>(path: string): Observable<T> {
    return this.http.delete<T>(`${this.API_URL}${path}`, {
      headers: this.getHeaders()
    });
  }

  patch<T>(path: string, body: any): Observable<T> {
    return this.http.patch<T>(`${this.API_URL}${path}`, body, {
      headers: this.getHeaders()
    });
  }
}
