import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface ConfirmationDialogData {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'danger' | 'warning' | 'info';
}

@Component({
  selector: 'app-confirmation-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirmation-dialog.html',
  styleUrls: ['./confirmation-dialog.css']
})
export class ConfirmationDialogComponent {
  @Input() visible = false;
  @Input() data: ConfirmationDialogData = {
    title: 'Confirmar',
    message: 'Tem certeza?',
    confirmText: 'Confirmar',
    cancelText: 'Cancelar',
    type: 'danger'
  };

  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  onConfirm(): void {
    this.confirm.emit();
    this.close();
  }

  onCancel(): void {
    this.cancel.emit();
    this.close();
  }

  onBackdropClick(event: Event): void {
    if (event.target === event.currentTarget) {
      this.onCancel();
    }
  }

  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.onCancel();
    } else if (event.key === 'Enter') {
      this.onConfirm();
    }
  }

  private close(): void {
    this.visible = false;
    this.visibleChange.emit(false);
  }

  get iconClass(): string {
    switch (this.data.type) {
      case 'warning': return 'pi pi-exclamation-triangle';
      case 'info': return 'pi pi-info-circle';
      case 'danger':
      default: return 'pi pi-trash';
    }
  }

  get headerClass(): string {
    switch (this.data.type) {
      case 'warning': return 'warning-header';
      case 'info': return 'info-header';
      case 'danger':
      default: return 'danger-header';
    }
  }

  get confirmButtonClass(): string {
    switch (this.data.type) {
      case 'warning': return 'warning-button';
      case 'info': return 'info-button';
      case 'danger':
      default: return 'danger-button';
    }
  }
}
