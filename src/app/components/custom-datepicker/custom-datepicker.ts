import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-custom-datepicker',
  standalone: true,
  imports: [CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomDatepickerComponent),
      multi: true
    }
  ],
  templateUrl: './custom-datepicker.html',
  styleUrls: ['./custom-datepicker.css']
})
export class CustomDatepickerComponent implements ControlValueAccessor {
  @Input() placeholder: string = 'Selecione a data';
  @Input() disabled: boolean = false;
  @Input() label: string = '';
  @Input() required: boolean = false;
  @Input() id: string = '';
  @Input() minDate: Date | null = null;

  @Output() onChange = new EventEmitter<Date | null>();

  isOpen = false;
  selectedDate: Date | null = null;
  displayValue: string = '';
  private _value: Date | null = null;

  currentMonth: number = new Date().getMonth();
  currentYear: number = new Date().getFullYear();
  calendarDays: Date[] = [];

  private onChangeCallback = (value: Date | null) => {};
  private onTouchedCallback = () => {};

  get value(): Date | null {
    return this._value;
  }

  set value(val: Date | null) {
    this._value = val;
    this.selectedDate = val;
    this.displayValue = val ? this.formatDate(val) : '';
    this.onChangeCallback(val);
  }

  constructor() {
    this.generateCalendar();
  }

  writeValue(value: Date | null): void {
    this._value = value;
    this.selectedDate = value;
    this.displayValue = value ? this.formatDate(value) : '';
    if (value) {
      this.currentMonth = value.getMonth();
      this.currentYear = value.getFullYear();
      this.generateCalendar();
    }
  }

  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedCallback = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  toggleCalendar(): void {
    if (!this.disabled) {
      this.isOpen = !this.isOpen;
      if (this.isOpen) {
        this.onTouchedCallback();
        this.generateCalendar();
      }
    }
  }

  closeCalendar(): void {
    this.isOpen = false;
  }

  selectDate(date: Date): void {
    if (this.isDateDisabled(date)) {
      return;
    }

    this.value = date;
    this.isOpen = false;
    this.onChange.emit(date);
  }

  isDateDisabled(date: Date): boolean {
    if (!this.minDate) return false;
    return date < this.minDate;
  }

  isSelectedDate(date: Date): boolean {
    if (!this.selectedDate) return false;
    return date.toDateString() === this.selectedDate.toDateString();
  }

  isToday(date: Date): boolean {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  }

  formatDate(date: Date): string {
    return date.toLocaleDateString('pt-BR');
  }

  generateCalendar(): void {
    const firstDay = new Date(this.currentYear, this.currentMonth, 1);
    const lastDay = new Date(this.currentYear, this.currentMonth + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    this.calendarDays = [];
    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      this.calendarDays.push(date);
    }
  }

  previousMonth(): void {
    if (this.currentMonth === 0) {
      this.currentMonth = 11;
      this.currentYear--;
    } else {
      this.currentMonth--;
    }
    this.generateCalendar();
  }

  nextMonth(): void {
    if (this.currentMonth === 11) {
      this.currentMonth = 0;
      this.currentYear++;
    } else {
      this.currentMonth++;
    }
    this.generateCalendar();
  }

  getMonthName(): string {
    const months = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];
    return months[this.currentMonth];
  }

  getWeekDays(): string[] {
    return ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  }

  trackByDate(index: number, date: Date): string {
    return date.toISOString();
  }
}
