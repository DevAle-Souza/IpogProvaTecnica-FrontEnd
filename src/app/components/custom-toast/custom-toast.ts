import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ToastMessage } from '../../services/toast.service';

@Component({
  selector: 'app-custom-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './custom-toast.html',
  styleUrls: ['./custom-toast.css'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate('300ms ease-out', style({ transform: 'translateX(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ transform: 'translateX(100%)', opacity: 0 }))
      ])
    ])
  ]
})
export class CustomToastComponent implements OnInit, OnDestroy {
  @Input() messages: ToastMessage[] = [];
  @Output() messageClose = new EventEmitter<string>();

  private timers: Map<string, any> = new Map();

  ngOnInit(): void {
    this.messages.forEach(message => {
      if (message.id && message.life && message.life > 0) {
        this.setAutoClose(message.id, message.life);
      }
    });
  }

  ngOnDestroy(): void {
    this.timers.forEach(timer => clearTimeout(timer));
    this.timers.clear();
  }

  closeMessage(messageId: string): void {
    this.clearTimer(messageId);
    this.messageClose.emit(messageId);
  }

  private setAutoClose(messageId: string, life: number): void {
    const timer = setTimeout(() => {
      this.closeMessage(messageId);
    }, life);
    this.timers.set(messageId, timer);
  }

  private clearTimer(messageId: string): void {
    const timer = this.timers.get(messageId);
    if (timer) {
      clearTimeout(timer);
      this.timers.delete(messageId);
    }
  }

  getIconClass(severity: string): string {
    switch (severity) {
      case 'success':
        return 'pi pi-check-circle';
      case 'error':
        return 'pi pi-times-circle';
      case 'warning':
        return 'pi pi-exclamation-triangle';
      case 'info':
        return 'pi pi-info-circle';
      default:
        return 'pi pi-info-circle';
    }
  }

  getSeverityClass(severity: string): string {
    return `toast-${severity}`;
  }

  trackByMessageId(index: number, message: ToastMessage): string {
    return message.id || index.toString();
  }
}
