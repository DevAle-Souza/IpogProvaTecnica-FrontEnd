import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface ToastMessage {
  id?: string;
  severity: 'success' | 'error' | 'warning' | 'info';
  summary: string;
  detail: string;
  life?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private messagesSubject = new BehaviorSubject<ToastMessage[]>([]);
  public messages$ = this.messagesSubject.asObservable();

  private messageIdCounter = 0;

  private generateId(): string {
    return `toast-${++this.messageIdCounter}-${Date.now()}`;
  }

  show(message: Omit<ToastMessage, 'id'>): string {
    const id = this.generateId();
    const toastMessage: ToastMessage = {
      ...message,
      id,
      life: message.life || 5000
    };

    const currentMessages = this.messagesSubject.value;
    this.messagesSubject.next([...currentMessages, toastMessage]);

    return id;
  }

  success(summary: string, detail: string, life?: number): string {
    return this.show({
      severity: 'success',
      summary,
      detail,
      life
    });
  }

  error(summary: string, detail: string, life?: number): string {
    return this.show({
      severity: 'error',
      summary,
      detail,
      life
    });
  }

  warning(summary: string, detail: string, life?: number): string {
    return this.show({
      severity: 'warning',
      summary,
      detail,
      life
    });
  }

  info(summary: string, detail: string, life?: number): string {
    return this.show({
      severity: 'info',
      summary,
      detail,
      life
    });
  }

  close(messageId: string): void {
    const currentMessages = this.messagesSubject.value;
    const filteredMessages = currentMessages.filter(msg => msg.id !== messageId);
    this.messagesSubject.next(filteredMessages);
  }

  clear(): void {
    this.messagesSubject.next([]);
  }

  getMessages(): ToastMessage[] {
    return this.messagesSubject.value;
  }
}
